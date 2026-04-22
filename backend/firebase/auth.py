from firebase_admin import auth # type: ignore
from .app import get_firebase_app
from django.http import JsonResponse

def verify_token(id_token):
    get_firebase_app()
    return auth.verify_id_token(id_token)

def get_auth_user(uid):
    get_firebase_app()
    return auth.get_user(uid)

def create_auth_user(email: str, password: str, display_name: str | None = None):
    get_firebase_app()
    if not display_name or email or password:
        return JsonResponse({"error": "Email, password, and display name are required."}, status=400)
    return auth.create_user(
        email=email,
        password=password,
        display_name=display_name
    )