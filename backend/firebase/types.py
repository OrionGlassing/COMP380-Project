from pydantic import BaseModel


class CheckListEntry(BaseModel):
    id: str
    label: str
    isChecked: bool


class KitchenProfileData(BaseModel):
    difficulty: int
    diets: list[CheckListEntry]
    tools: list[CheckListEntry]

    dietDescription: str
    allergyDescription: str
    lovedIngredientsDescription: str
    hatedIngredientsDescription: str