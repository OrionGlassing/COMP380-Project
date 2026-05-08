import json
from typing import Any
from groq import Groq
from django.conf import settings


MODEL_NAME = "llama-3.1-8b-instant"


def get_groq_client():
    api_key = getattr(settings, "GROQ_API_KEY", None)

    if not api_key:
        raise ValueError("GROQ_API_KEY is missing")

    return Groq(api_key=api_key)


def chat(
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
              "imageURL": "string",
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
            - imageURL can be an empty string.
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
        model=MODEL_NAME,
        messages=[system_message, user_message],
        max_tokens=1200,
        temperature=0.4,
    )

    content = response.choices[0].message.content.strip()

    try:
        recipe_data = json.loads(content)
    except json.JSONDecodeError:
        raise ValueError(f"LLM did not return valid JSON: {content}")

    if "title" not in recipe_data:
        raise ValueError("LLM response missing title")

    if "ingredients" not in recipe_data:
        raise ValueError("LLM response missing ingredients")

    if "directions" not in recipe_data:
        raise ValueError("LLM response missing directions")

    if "cook_time" not in recipe_data:
        raise ValueError("LLM response missing cook_time")

    if not isinstance(recipe_data["ingredients"], list):
        raise ValueError("ingredients must be a list")

    if not isinstance(recipe_data["directions"], list):
        raise ValueError("directions must be a list")

    return recipe_data