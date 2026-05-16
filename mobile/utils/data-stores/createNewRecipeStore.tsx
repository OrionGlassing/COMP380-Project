import { create } from "zustand";

import { CheckListEntry } from "@/src/types/dataTypes";
import { useCustomizeProfileStore } from "@/utils/data-stores/customizeProfileStore";
import { useAuthStore } from "../authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface CreateNewRecipeState {
  recipeTypeOptions: CheckListEntry[];
  toggleRecipeOption: (id: string) => void;

  cuisineTypeOptions: CheckListEntry[];
  toggleCuisineOption: (id: string) => void;

  seasonTypeOptions: CheckListEntry[];
  toggleSeasonOption: (id: string) => void;

  spiceLevelValue: string;
  spiceLevelIndex: number;
  setSpiceLevel: (value: string, index: number) => void;

  sweetnessLevelValue: string;
  sweetnessLevelIndex: number;
  setSweetnessLevel: (value: string, index: number) => void;

  recipeComplexityValue: string;
  recipeComplexityIndex: number;
  setRecipeComplexity: (value: string, index: number) => void;

  recipeTimeValue: string;
  recipeTimeIndex: number;
  setRecipeTime: (value: string, index: number) => void;

  recipeDescription: string;
  setRecipeDescription: (value: string) => void;

  isSubmitting: boolean;
  submitError: boolean;
  submitNewRecipe: () => Promise<string>;
  reset: () => void;
}

const getInitialCheckListData = () => ({
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

const createFreshCheckListData = () => {
  const data = getInitialCheckListData();

  return {
    recipeTypeOptions: data.recipeOptions,
    cuisineTypeOptions: data.cuisineOptions,
    seasonTypeOptions: data.seasonOptions,
  };
};

export const useCreateNewRecipeStore = create<CreateNewRecipeState>(
  (set, get) => ({
    ...createFreshCheckListData(),

    toggleRecipeOption: (id) =>
      set((state) => ({
        recipeTypeOptions: state.recipeTypeOptions.map((type) =>
          type.id === id ? { ...type, isChecked: !type.isChecked } : type
        ),
      })),

    toggleCuisineOption: (id) =>
      set((state) => ({
        cuisineTypeOptions: state.cuisineTypeOptions.map((type) =>
          type.id === id ? { ...type, isChecked: !type.isChecked } : type
        ),
      })),

    toggleSeasonOption: (id) =>
      set((state) => ({
        seasonTypeOptions: state.seasonTypeOptions.map((type) =>
          type.id === id ? { ...type, isChecked: !type.isChecked } : type
        ),
      })),

    spiceLevelValue: "Mild",
    spiceLevelIndex: 2,
    setSpiceLevel: (value, index) =>
      set({
        spiceLevelValue: value,
        spiceLevelIndex: index,
      }),

    sweetnessLevelValue: "Some",
    sweetnessLevelIndex: 2,
    setSweetnessLevel: (value, index) =>
      set({
        sweetnessLevelValue: value,
        sweetnessLevelIndex: index,
      }),

    recipeComplexityValue: "Average",
    recipeComplexityIndex: 1,
    setRecipeComplexity: (value, index) =>
      set({
        recipeComplexityValue: value,
        recipeComplexityIndex: index,
      }),

    recipeTimeValue: "45 min",
    recipeTimeIndex: 2,
    setRecipeTime: (value, index) =>
      set({
        recipeTimeValue: value,
        recipeTimeIndex: index,
      }),

    recipeDescription: "",
    setRecipeDescription: (value) =>
      set({
        recipeDescription: value,
      }),

    isSubmitting: false,
    submitError: false,

    submitNewRecipe: async () => {
      set({
        isSubmitting: true,
        submitError: false,
      });

      const state = get();
      const userID = useAuthStore.getState().userID;

      if (!API_URL) {
        set({
          isSubmitting: false,
          submitError: true,
        });

        throw new Error("EXPO_PUBLIC_API_URL is missing.");
      }

      if (!userID) {
        set({
          isSubmitting: false,
          submitError: true,
        });

        throw new Error("Cannot submit recipe: userID is missing.");
      }

      if (!state.recipeDescription.trim()) {
        set({
          isSubmitting: false,
          submitError: true,
        });

        throw new Error("Recipe description is required before submitting.");
      }

      const profileState = useCustomizeProfileStore.getState();

      const userProfile = {
        difficulty: profileState.cookingExperienceIndex,

        diets: profileState.dietOptions
          .filter((diet) => diet.isChecked)
          .map((diet) => diet.id),

        tools: profileState.kitchenTools
          .filter((tool) => tool.isChecked)
          .map((tool) => tool.id),

        dietDescription: profileState.dietDescription,
        allergyDescription: profileState.allergyDescription,
        lovedIngredientsDescription: profileState.lovedIngredientsDescription,
        hatedIngredientsDescription: profileState.hatedIngredientsDescription,
      };

      const payload = {
        creator_id: userID,

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
        description: state.recipeDescription.trim(),

        user_profile: userProfile,
      };

      console.log("CREATE RECIPE PAYLOAD:", JSON.stringify(payload, null, 2));
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
          throw new Error(errorText || "Error making new recipe.");
        }

        const data = await response.json();

        set({
          isSubmitting: false,
          submitError: false,
        });

        get().reset();

        return data.recipe_id;
      } catch (error) {
        set({
          isSubmitting: false,
          submitError: true,
        });

        console.error("Error submitting new recipe:", error);

        throw error;
      }
    },

    reset: () => {
      set({
        ...createFreshCheckListData(),

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
        submitError: false,
      });
    },
  })
);