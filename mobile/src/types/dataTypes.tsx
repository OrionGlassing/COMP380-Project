export interface CheckListEntry {
    id: string;
    label: string;
    isChecked: boolean;
}

export interface Recipe {
  recipe_id: string;
  title: string;
  imageURL: string;
  ingredients: string[];
  directions: string[];
  cook_time: string;
}