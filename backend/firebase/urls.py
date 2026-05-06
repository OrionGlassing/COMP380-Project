from . import signup, login, profile # type: ignore
from django.urls import path

urlpatterns = [
    path("signup/", signup.signup_view, name="signup"),
    path("login/", login.login_view, name="login"),
    path("profile/", profile.profile_view, name="profile"),
]