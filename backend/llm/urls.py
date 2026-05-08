from django.urls import path
from . import views # type: ignore

urlpatterns = [
    path("recipes/<int:recipe_id>/", views.get_recipe_by_id, name="recipe"),
    path("chat/", views.chat_view, name="chat"),
]