import base64
import json
import os
import uuid
from typing import Any

from django.conf import settings
from groq import Groq
from openai import OpenAI


GROQ_MODEL_NAME = "llama-3.1-8b-instant"
OPENAI_IMAGE_MODEL = "gpt-image-1"


def get_groq_client():
    api_key = getattr(settings, "GROQ_API_KEY", None)

    if not api_key:
        raise ValueError("GROQ_API_KEY is missing")

    return Groq(api_key=api_key)


def get_openai_client():
    api_key = getattr(settings, "OPENAI_API_KEY", None)

    if not api_key:
        raise ValueError("OPENAI_API_KEY is missing")

    return OpenAI(api_key=api_key)


def generate_recipe_data(
    recipe_request_data: dict[str, Any],
    user_profile_data: dict[str, Any],
) -> dict[str, Any]:
    client = get_groq_client()

    system_message = {
        "role": "system",
        "content": """
            You are Chef, a recipe-generation assistant.

            Return ONLY valid JSON.
            Do not include markdown.
            Do not include code fences.
            Do not include explanations outside the JSON.

            The JSON must follow this exact shape:

            {
              "title": "string",
              "ingredients": ["string"],
              "directions": ["string"],
              "cook_time": "string"
            }

            Rules:
            - Generate a recipe based on the user's recipe request and user profile.
            - Respect allergies, dietary restrictions, disliked ingredients, preferred cuisines, and cooking skill level.
            - If the user has allergies, avoid those ingredients completely.
            - Ingredients must include amounts.
            - Directions must be clear, numbered strings.
            - cook_time should be a human-readable string like "30 minutes".
            """
    }

    user_message = {
        "role": "user",
        "content": json.dumps(
            {
                "user_profile": user_profile_data,
                "recipe_request": recipe_request_data,
            },
            indent=2,
        ),
    }

    print("USER PROFILE DATA:", json.dumps(user_profile_data, indent=2))
    print("RECIPE REQUEST DATA:", json.dumps(recipe_request_data, indent=2))

    response = client.chat.completions.create(
        model=GROQ_MODEL_NAME,
        messages=[system_message, user_message],
        max_tokens=1200,
        temperature=0.4,
    )

    content = response.choices[0].message.content.strip()

    try:
        recipe_data = json.loads(content)
    except json.JSONDecodeError:
        raise ValueError(f"LLM did not return valid JSON: {content}")

    required_fields = ["title", "ingredients", "directions", "cook_time"]

    for field in required_fields:
        if field not in recipe_data:
            raise ValueError(f"LLM response missing {field}")

    if not isinstance(recipe_data["title"], str):
        raise ValueError("title must be a string")

    if not isinstance(recipe_data["ingredients"], list):
        raise ValueError("ingredients must be a list")

    if not isinstance(recipe_data["directions"], list):
        raise ValueError("directions must be a list")

    if not isinstance(recipe_data["cook_time"], str):
        raise ValueError("cook_time must be a string")

    return {
        "title": recipe_data["title"],
        "imageURL": "",
        "ingredients": recipe_data["ingredients"],
        "directions": recipe_data["directions"],
        "cook_time": recipe_data["cook_time"],
    }


def generate_recipe_image(recipe_data: dict[str, Any]) -> str:
    client = get_openai_client()

    title = recipe_data.get("title", "")
    cook_time = recipe_data.get("cook_time", "")
    ingredients = recipe_data.get("ingredients", [])

    ingredients_text = ", ".join(ingredients[:12]) if ingredients else ""

    prompt = f"""
    Create a realistic, appetizing food photography image for this recipe.

    Recipe title: {title}
    Cook time: {cook_time}
    Main ingredients: {ingredients_text}

    Style requirements:
    - realistic food photography
    - finished plated dish
    - warm natural lighting
    - restaurant-quality presentation
    - no text
    - no logos
    - no watermark
    - square image for a mobile recipe card
    """

    result = client.images.generate(
        model=OPENAI_IMAGE_MODEL,
        prompt=prompt,
        size="1024x1024",
        quality="low",
        n=1,
    )

    image_base64 = result.data[0].b64_json
    image_bytes = base64.b64decode(image_base64)

    file_name = f"recipe_{uuid.uuid4().hex}.png"
    relative_path = os.path.join("recipe-images", file_name)
    absolute_path = os.path.join(settings.MEDIA_ROOT, relative_path)

    os.makedirs(os.path.dirname(absolute_path), exist_ok=True)

    with open(absolute_path, "wb") as image_file:
        image_file.write(image_bytes)

    return settings.MEDIA_URL + relative_path


def chat(
    recipe_request_data: dict[str, Any],
    user_profile_data: dict[str, Any],
) -> dict[str, Any]:
    recipe_data = generate_recipe_data(
        recipe_request_data=recipe_request_data,
        user_profile_data=user_profile_data,
    )

    try:
        image_url = generate_recipe_image(recipe_data)

        if image_url:
            recipe_data["imageURL"] = image_url

    except Exception as error:
        print("Recipe image generation failed:", error)
        recipe_data["imageURL"] = ""

    return recipe_data