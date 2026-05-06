import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .llm import chat # type: ignore
from rest_framework.decorators import api_view, permission_classes # type: ignore
from rest_framework.permissions import AllowAny # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from .models import Recipe

@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def chat_view(request):

    print("RAW BODY:", request.body)
    print("REQUEST DATA:", request.data)
    
    data = request.data

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

    user_profile_data = {
        "dietary_restrictions": [],
        "allergies": [],
        "disliked_ingredients": [],
        "preferred_cuisines": [],
        "cooking_skill_level": "beginner",
        "household_size": 1,
    }

    try:
        generated_recipe = chat(
            recipe_request_data=recipe_request_data,
            user_profile_data=user_profile_data,
        )

        recipe = Recipe.objects.create(
            user=request.user if request.user.is_authenticated else None,
            title=generated_recipe.get("title", "Untitled Recipe"),
            imageURL=generated_recipe.get("imageURL", ""),
            ingredients=generated_recipe.get("ingredients", []),
            directions=generated_recipe.get("directions", []),
            cook_time=generated_recipe.get("cook_time", ""),
            original_request=recipe_request_data,
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