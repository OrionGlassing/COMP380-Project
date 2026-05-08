# Update credentials in settings.py for firebase

We're gonna need external credentials from the Firebase Project we created, 
the database url, the firestore container, and/if we used google credentials. 

# settings.py
```python
import os

FIREBASE_USE_ADC = os.getenv("FIREBASE_USE_ADC", "true").lower() == "true"
FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID")
FIREBASE_DATABASE_URL = os.getenv("FIREBASE_DATABASE_URL")
FIREBASE_STORAGE_BUCKET = os.getenv("FIREBASE_STORAGE_BUCKET")
GOOGLE_APPLICATION_CREDENTIALS = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

```
All of this information is gonna need to be generated on your end and kept in a `.env` file,
you can share those specific secrets with me in a different way so we can all utilize 
the databasing and authentication this application is providing.

# Firebase template created.

I created an application template outside of this directory, in the main backend project directory.
In there are necessary firebase components; `authentication`, `static storage`, `user profile specifications`.

This is how we hook the frontend through HTTPS requests.