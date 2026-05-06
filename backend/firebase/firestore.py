from firebase_admin import firestore  # type: ignore

from .types import KitchenProfileData
from .app import get_firebase_app


def get_firestore():
    get_firebase_app()
    return firestore.client()


def save_user_profile(uid: str, prfData):
    db = get_firestore()

    if hasattr(prfData, "model_dump"):
        profile_dict = prfData.model_dump()
    else:
        profile_dict = prfData

    db.collection("profiles").document(uid).set(profile_dict)


def get_user_profile(uid: str) -> dict | None:
    db = get_firestore()

    doc = db.collection("profiles").document(uid).get()

    if not doc.exists:
        return None

    return doc.to_dict()


def save_recipe_for_user(uid, recipe_id, recipe_data):
    db = get_firestore()

    db.collection("profiles").document(uid) \
        .collection("saved_recipes").document(recipe_id) \
        .set(recipe_data)


def get_saved_recipes(uid):
    db = get_firestore()

    docs = db.collection("profiles").document(uid) \
        .collection("saved_recipes").stream()

    return [doc.to_dict() for doc in docs]


def get_saved_recipe(uid, recipe_id):
    db = get_firestore()

    doc = db.collection("profiles").document(uid) \
        .collection("saved_recipes").document(recipe_id) \
        .get()

    return doc if doc.exists else None


def delete_saved_recipe(uid, recipe_id):
    db = get_firestore()

    db.collection("profiles").document(uid) \
        .collection("saved_recipes").document(recipe_id) \
        .delete()