# .Env File

Upon reading this for the first time, to make any of this work, you'll need to create a `.env` file in the same directory as manage.py. This file contains security information that we enable or disable as we work on production for the server, and it contains the secret_key that is unique to our server. For obvious reasons, thats not committed onto the github. When you finish reading this segment, you'll reach out to me and I'll personally send you the details of that file as to maintain its safety.

# Base Dir

This is the base directory for the Django backend project. When we run API calls on our frontend we need this server running as well. Before you do anything, have python installed on your computer.

# Mac:

`brew install python`

# Windows:

`winget install python`

# Virtual Environment:

You need to do this step to run the backend service. for mac use `python3` for windows just `python` will work:
Make this directory in the base directory, where both `backend/` and `mobile/` lives. Do NOT do it here in `backend/`.

`python(3) -m venv venv`

Activate your virtual environment. The command is different for Mac and Windows alike.

# Mac:

`source venv/bin/activate`

# Windows:

`venv\Scripts\activate`

After that, you'll likely get the indication you're in a virtual environment `(venv)YourDamnName:%`

# Install dependencies:

I've generated a requirements.txt file for all the backend applications installed to make this functional, you also have to install them.

`pip install requirements.txt`

# Run server: 

You have to be in the manage.py directory for this command to work. The command is different for Mac and Windows. For mac use `python3` for windows just `python` will work:

`python(3) manage.py runserver`

Should hopefully be working.