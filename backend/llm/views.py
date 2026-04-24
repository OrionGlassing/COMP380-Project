import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .llm import chat # type: ignore

@csrf_exempt
def chat_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        body = json.loads(request.body)
        messages = body.get("messages", [])

        if not isinstance(messages, list):
            return JsonResponse({"error": "messages must be a list"}, status=400)

        result = chat(messages)
        return JsonResponse(result)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)