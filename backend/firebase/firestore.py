from firebase_admin import firestore # type: ignore
from .types import KitchenProfileData
from .app import get_firebase_app

def get_firestore():
    get_firebase_app()
    return firestore.client()

def save_user_profile(uid: str, prfData: KitchenProfileData):
    db = get_firestore()
    db.collection("profiles").document(uid).set(prfData)

def get_user_profile(uid: str):
    db = get_firestore()
    doc = db.collection("profiles").document(uid).get()
    return doc if doc.exists else None