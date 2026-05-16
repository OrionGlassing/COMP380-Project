from firebase_admin import storage # type: ignore
from .app import get_firebase_app

def get_bucket():
    get_firebase_app()
    return storage.bucket()

def upload_file(file_path: str, destination_path: str):
    bucket = get_bucket()
    blob = bucket.blob(destination_path)
    blob.upload_from_filename(file_path)
    return blob.name