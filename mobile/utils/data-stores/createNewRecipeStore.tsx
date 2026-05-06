import { create } from "zustand" //in memory state management
import { CheckListEntry } from "@/src/types/dataTypes";

//
//Notes:
//
/*
This zustand store contains all of the create new recipe page data.

This data is managed by the frontend, and then passed to the backend.

The data saved with zustand state so that it serves as a draft,
where the user can go back and forth between pages and keep the new recipe draft intact.

The data is not saved to device storage, because we do not need to save the draft between app launches.
*/

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface CreateNewRecipeState {
    //Recipe Type Checklist
    recipeTypeOptions: CheckListEntry[];
    toggleRecipeOption: (id: string) => void;

    //Cuisine Type Checklist
    cuisineTypeOptions: CheckListEntry[];
    toggleCuisineOption: (id: string) => void;

    //Season Type Checklist
    seasonTypeOptions: CheckListEntry[];
    toggleSeasonOption: (id: string) => void;

    //Spice Level Slider
    spiceLevelValue: string;
    spiceLevelIndex: number;
    setSpiceLevel: (value: string, index: number) => void;

    //Sweetness Level Slider
    sweetnessLevelValue: string;
    sweetnessLevelIndex: number;
    setSweetnessLevel: (value: string, index: number) => void;

    //Recipe Complexity Slider
    recipeComplexityValue: string;
    recipeComplexityIndex: number;
    setRecipeComplexity: (value: string, index: number) => void;

    //Recipe Time Limit Slider
    recipeTimeValue: string;
    recipeTimeIndex: number;
    setRecipeTime: (value: string, index: number) => void;

    //Recipe Description Text Box
    recipeDescription: string;
    setRecipeDescription: (value: string) => void;

    //Submitting data to the backend
    isSubmitting: boolean;
    submitNewRecipe: () => Promise<string>;
    reset: () => void;
}

const getInitialinitialCheckListData = () => ({
  recipeOptions: [
    { id: "breakfast", label: "Breakfast", isChecked: false },
    { id: "lunch", label: "Lunch", isChecked: false },
    { id: "dinner", label: "Dinner", isChecked: false },
    { id: "dessert", label: "Dessert", isChecked: false },
    { id: "baking", label: "Baking", isChecked: false },
    { id: "snack", label: "Snack", isChecked: false },
    { id: "drink", label: "Drink", isChecked: false },
    { id: "specialevent", label: "Special Event", isChecked: false },
  ],
  cuisineOptions: [
    { id: "american", label: "American", isChecked: false },
    { id: "mexican", label: "Mexican", isChecked: false },
    { id: "italian", label: "Italian", isChecked: false },
    { id: "french", label: "French", isChecked: false },
    { id: "greek", label: "Greek", isChecked: false },
    { id: "chinese", label: "Chinese", isChecked: false },
    { id: "japanese", label: "Japanese", isChecked: false },
    { id: "thai", label: "Thai", isChecked: false },
    { id: "korean", label: "Korean", isChecked: false },
    { id: "indian", label: "Indian", isChecked: false },
  ],
  seasonOptions: [
    { id: "fall", label: "Fall", isChecked: false },
    { id: "winter", label: "Winter", isChecked: false },
    { id: "spring", label: "Spring", isChecked: false },
    { id: "summer", label: "Summer", isChecked: false },
  ],
});

const initialCheckListData = getInitialinitialCheckListData();

export const useCreateNewRecipeStore = create<CreateNewRecipeState>((set, get) => ({
    //Recipe Type Checklist
    recipeTypeOptions: initialCheckListData.recipeOptions,
    toggleRecipeOption: (id) => set((state) => ({
                recipeTypeOptions: state.recipeTypeOptions.map((type) =>
                    type.id === id
                        ? { ...type, isChecked: !type.isChecked }
                        : type
                ),
            })),

    //Cuisine Type Checklist
    cuisineTypeOptions: initialCheckListData.cuisineOptions,
    toggleCuisineOption: (id) => set((state) => ({
                cuisineTypeOptions: state.cuisineTypeOptions.map((type) =>
                    type.id === id
                        ? { ...type, isChecked: !type.isChecked }
                        : type
                ),
            })),

    //Season Type Checklist
    seasonTypeOptions: initialCheckListData.seasonOptions,
    toggleSeasonOption: (id) => set((state) => ({
                seasonTypeOptions: state.seasonTypeOptions.map((type) =>
                    type.id === id
                        ? { ...type, isChecked: !type.isChecked }
                        : type
                ),
            })),

    //Spice Level Slider
    spiceLevelValue: "Mild",
    spiceLevelIndex: 2,
    setSpiceLevel: (value, index) => set({
        spiceLevelValue: value,
        spiceLevelIndex: index,
    }),

    //Sweetness Level Slider
    sweetnessLevelValue: "Some",
    sweetnessLevelIndex: 2,
    setSweetnessLevel: (value, index) => set({
        sweetnessLevelValue: value,
        sweetnessLevelIndex: index,
    }),

    //Recipe Complexity Slider
    recipeComplexityValue: "Average",
    recipeComplexityIndex: 1,
    setRecipeComplexity: (value, index) => set({
        recipeComplexityValue: value,
        recipeComplexityIndex: index,
    }),

    //Recipe Time Limit Slider
    recipeTimeValue: "45 min",
    recipeTimeIndex: 2,
    setRecipeTime: (value, index) => set({
        recipeTimeValue: value,
        recipeTimeIndex: index,
    }),

    //Recipe Description Text Box
    recipeDescription: "",
    setRecipeDescription: (value) => set({
        recipeDescription: value,
    }),

    //Submitting to the backend
    isSubmitting: false,
    submitNewRecipe: async () => {
      set({ isSubmitting: true });

      const state = get();

      if (!state.recipeDescription.trim()) {
        set({ isSubmitting: false });
        throw new Error("Recipe description is required before submitting.");
      }

      const payload = {
        recipe_types: state.recipeTypeOptions
          .filter((opt) => opt.isChecked)
          .map((opt) => opt.label),

        cuisine_types: state.cuisineTypeOptions
          .filter((opt) => opt.isChecked)
          .map((opt) => opt.label),

        season_types: state.seasonTypeOptions
          .filter((opt) => opt.isChecked)
          .map((opt) => opt.label),

        spice_level: state.spiceLevelValue,
        sweetness_level: state.sweetnessLevelValue,
        complexity: state.recipeComplexityValue,
        time_limit: state.recipeTimeValue,
        description: state.recipeDescription,
      };

      console.log("CREATE RECIPE PAYLOAD:", JSON.stringify(payload, null, 2));
      console.log("DESCRIPTION VALUE:", state.recipeDescription);
      console.log("API URL:", API_URL);

      try {
        const response = await fetch(`${API_URL}/ai/chat/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Error making new recipe!");
        }

        const data = await response.json();

        set({ isSubmitting: false });

        state.reset();

        return data.recipe_id;
      } catch (error) {
        set({ isSubmitting: false });
        console.error("Error submitting new recipe:", error);

        throw error;
      }
    },

    reset: () => set({
    recipeTypeOptions: initialCheckListData.recipeOptions.map((opt) => ({
        ...opt,
        isChecked: false,
    })),
    cuisineTypeOptions: initialCheckListData.cuisineOptions.map((opt) => ({
        ...opt,
        isChecked: false,
    })),
    seasonTypeOptions: initialCheckListData.seasonOptions.map((opt) => ({
        ...opt,
        isChecked: false,
    })),

    spiceLevelValue: "Mild",
    spiceLevelIndex: 2,

    sweetnessLevelValue: "Some",
    sweetnessLevelIndex: 2,

    recipeComplexityValue: "Average",
    recipeComplexityIndex: 1,

    recipeTimeValue: "45 min",
    recipeTimeIndex: 2,

    recipeDescription: "",
    isSubmitting: false,
}),
}));