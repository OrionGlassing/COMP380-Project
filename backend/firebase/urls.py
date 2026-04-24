from . import signup, login # type: ignore
from django.urls import path

urlpatterns = [
    path("signup/", signup.signup_view, name="signup"),
    path("login/", login.login_view, name="login"),
]