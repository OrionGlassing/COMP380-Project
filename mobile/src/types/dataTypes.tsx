export interface CheckListEntry {
    id: string;
    label: string;
    isChecked: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  steps: string;
}