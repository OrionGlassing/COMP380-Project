import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .firestore import get_user_profile, save_user_profile


@csrf_exempt
def profile_view(request):
    uid = "firebase_test_user"

    if request.method == "GET":
        profile = get_user_profile(uid)

        if profile is None:
            return JsonResponse({"error": "Profile not found"}, status=404)

        return JsonResponse(profile, status=200)

    if request.method == "PUT":
        try:
            profile_data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        save_user_profile(uid, profile_data)

        updated_profile = get_user_profile(uid)

        return JsonResponse(updated_profile, status=200)

    return JsonResponse({"error": "Method not allowed"}, status=405)