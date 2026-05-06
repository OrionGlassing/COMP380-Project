from django.db import models
from django.conf import settings



class Recipe(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="recipes",
        null=True,
        blank=True,
    )

    title = models.CharField(max_length=255)
    imageURL = models.URLField(blank=True, default="")
    ingredients = models.JSONField(default=list)
    directions = models.JSONField(default=list)
    cook_time = models.CharField(max_length=100, blank=True, default="")

    original_request = models.JSONField(default=dict)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title