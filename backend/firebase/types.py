from typing import TypedDict, List, Optional

# Here we define the structure of data to be used in the kitchen profile.
# This includes all relevant information for the LLM to generate a personalized
# meal plan based on the user's preferences and constraints.

class KitchenProfileData(TypedDict, total=False):
    uid: str
    email: str
    dietary_restrictions: List[str]
    allergies: List[str]
    disliked_ingredients: List[str]
    favorite_cuisines: List[str]
    household_size: int
    budget_preference: str
    calorie_goal: int
    available_appliances: List[str]