import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .llm import chat # type: ignore
from rest_framework.decorators import api_view, permission_classes # type: ignore
from rest_framework.permissions import AllowAny # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from .models import Recipe
import random
from django.views.decorators.http import require_GET

@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def chat_view(request):
    data = request.data

    creator_id = data.get("creator_id", "")

    if not creator_id or not isinstance(creator_id, str):
        return Response(
            {"error": "creator_id is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    description = data.get("description", "")

    if not description or not isinstance(description, str) or not description.strip():
        return Response(
            {"error": "description is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    recipe_types = data.get("recipe_types", [])
    cuisine_types = data.get("cuisine_types", [])
    season_types = data.get("season_types", [])

    if not isinstance(recipe_types, list):
        recipe_types = []

    if not isinstance(cuisine_types, list):
        cuisine_types = []

    if not isinstance(season_types, list):
        season_types = []

    recipe_request_data = {
        "recipe_types": recipe_types,
        "cuisine_types": cuisine_types,
        "season_types": season_types,
        "spice_level": data.get("spice_level", "Mild"),
        "sweetness_level": data.get("sweetness_level", "Some"),
        "complexity": data.get("complexity", "Average"),
        "time_limit": data.get("time_limit", "45 min"),
        "description": description.strip(),
    }

    profile = data.get("user_profile", {}) or {}

    difficulty_map = {
        0: "noob",
        1: "beginner",
        2: "average",
        3: "experienced",
        4: "pro",
    }
    
    difficulty = profile.get("difficulty", 2)
    
    user_profile_data = {
        "dietary_restrictions": profile.get("diets", []),
        "allergies": profile.get("allergyDescription", ""),
        "disliked_ingredients": profile.get("hatedIngredientsDescription", ""),
        "loved_ingredients": profile.get("lovedIngredientsDescription", ""),
        "diet_description": profile.get("dietDescription", ""),
        "available_tools": profile.get("tools", []),
        "cooking_skill_level": difficulty_map.get(difficulty, "average"),
        "household_size": 1,
    }

    try:
        generated_recipe = chat(
            recipe_request_data=recipe_request_data,
            user_profile_data=user_profile_data,
        )

        recipe = Recipe.objects.create(
            creator_id=creator_id,
            user=request.user if request.user.is_authenticated else None,
            title=generated_recipe.get("title", "Untitled Recipe"),
            imageURL=generated_recipe.get("imageURL", ""),
            ingredients=generated_recipe.get("ingredients", []),
            directions=generated_recipe.get("directions", []),
            cook_time=generated_recipe.get("cook_time", ""),
            original_request={
                "creator_id": creator_id,
                "recipe_request": recipe_request_data,
                "user_profile": user_profile_data,
            },
        )

        return Response(
            {
                "recipe_id": str(recipe.id),
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as error:
        return Response(
            {
                "error": str(error),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    
@api_view(["GET"])
@permission_classes([AllowAny])
def get_recipe_by_id(request, recipe_id):
    try:
        recipe = Recipe.objects.get(id=recipe_id)
    except Recipe.DoesNotExist:
        return Response(
            {
                "error": "Recipe not found",
                "recipe_id": str(recipe_id),
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    return Response(
        {
            "recipe_id": str(recipe.id),
            "title": recipe.title,
            "imageURL": recipe.imageURL,
            "ingredients": recipe.ingredients,
            "directions": recipe.directions,
            "cook_time": recipe.cook_time,
        },
        status=status.HTTP_200_OK,
    )

def serialize_recipe(recipe, request=None):
    image_url = recipe.imageURL

    if request and image_url and image_url.startswith("/"):
        image_url = request.build_absolute_uri(image_url)

    return {
        "recipe_id": str(recipe.id),
        "title": recipe.title,
        "imageURL": image_url,
        "ingredients": recipe.ingredients,
        "directions": recipe.directions,
        "cook_time": recipe.cook_time,
        "original_request": recipe.original_request,
        "created_at": recipe.created_at.isoformat(),
        "creator_id": recipe.creator_id,
    }


@require_GET
def user_cookbook(request, creator_id):
    recipes = Recipe.objects.filter(
        creator_id=creator_id
    ).order_by("-created_at")

    return JsonResponse(
        {
            "recipes": [
                serialize_recipe(recipe, request=request)
                for recipe in recipes
            ]
        },
        status=200,
    )

@require_GET
def random_recipe(request):
    recipe_ids = list(Recipe.objects.values_list("id", flat=True))

    if not recipe_ids:
        return JsonResponse(
            {"error": "No recipes found."},
            status=404,
        )

    random_id = random.choice(recipe_ids)
    recipe = Recipe.objects.get(id=random_id)

    return JsonResponse(
        serialize_recipe(recipe),
        status=200,
    )