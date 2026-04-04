import firebase_admin # type: ignore
from firebase_admin import credentials, firestore # type: ignore
from django.conf import settings

# Initializes Firebase App and returns it. If initialized, returns existing app.

def get_firebase_app():
    try:
        return firebase_admin.get_app()
    except ValueError:
        options = {}

        if getattr(settings, "FIREBASE_DATABASE_URL", None):
            options["databaseURL"] = settings.FIREBASE_DATABASE_URL

        if getattr(settings, "FIREBASE_STORAGE_BUCKET", None):
            options["storageBucket"] = settings.FIREBASE_STORAGE_BUCKET

        if getattr(settings, "FIREBASE_USE_ADC", True):
            return firebase_admin.initialize_app(options=options)
        
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
        return firebase_admin.initialize_app(cred, options)