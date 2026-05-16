from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .helpers import get_auth_user_by_email, create_auth_user # type: ignore
from firebase_admin import auth # type: ignore

@csrf_exempt
def signup_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed."}, status=405)

    try:
        body = json.loads(request.body)

        email = body.get("email", "").strip()
        password = body.get("password", "").strip()
        display_name = body.get("display_name", "").strip()

        if not email or not password or not display_name:
            return JsonResponse(
                {"error": "Email, password, and display name are required."},
                status=400,
            )

        if len(password) < 6:
            return JsonResponse(
                {"error": "Password must be at least 6 characters long."},
                status=400,
            )

        try:
            existing_user = get_auth_user_by_email(email)
            if existing_user:
                return JsonResponse(
                    {"error": "An account with this email already exists."},
                    status=400,
                )
        except auth.UserNotFoundError:
            pass

        user = create_auth_user(
            email=email,
            password=password,
            display_name=display_name,
        )

        return JsonResponse(
            {
                "message": "Account created successfully.",
                "user": {
                    "uid": user.uid,
                    "email": user.email,
                    "display_name": user.display_name,
                },
            },
            status=201,
        )

    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)