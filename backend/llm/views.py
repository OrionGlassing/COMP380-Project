from django.shortcuts import render
from django.http import JsonResponse

# Create views here.

def ping(request):
    return JsonResponse({"ok": True, "message": "API is active"})