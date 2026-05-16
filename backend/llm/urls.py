from django.urls import path
from . import views # type: ignore

urlpatterns = [
    path("cookbook/<str:creator_id>/", views.user_cookbook, name="user_cookbook"),
    path("recipes/<int:recipe_id>/", views.get_recipe_by_id, name="recipe"),
    path("chat/", views.chat_view, name="chat"),
    path("recipes/random/", views.random_recipe, name="random_recipe"),
]