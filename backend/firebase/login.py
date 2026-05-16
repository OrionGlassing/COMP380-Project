import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .helpers import verify_token, get_auth_user # type: ignore

@csrf_exempt
def login_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed."}, status=405)

    try:
        body = json.loads(request.body)
        id_token = body.get("id_token", "").strip()

        if not id_token:
            return JsonResponse({"error": "id_token is required."}, status=400)

        decoded_token = verify_token(id_token)
        uid = decoded_token["uid"]
        user = get_auth_user(uid)

        return JsonResponse(
            {
                "message": "Login successful.",
                "user": {
                    "uid": user.uid,
                    "email": user.email,
                    "display_name": user.display_name,
                },
            },
            status=200,
        )

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=401)