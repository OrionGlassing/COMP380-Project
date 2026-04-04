from firebase_admin import auth # type: ignore
from .app import get_firebase_app

def verify_token(id_token):
    get_firebase_app()
    return auth.verify_id_token(id_token)

def get_auth_user(uid):
    get_firebase_app()
    return auth.get_user(uid)

def create_auth_user(email: str, password: str, display_name: str | None = None):
    get_firebase_app()
    return auth.create_user(
        email=email,
        password=password,
        display_name=display_name
    )