import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Recipe } from "@/src/types/dataTypes";
import { useAuthStore } from "../authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface RecipeStore {
  recipes: Record<string, Recipe>;
  saved_recipes: string[];

  isFetchingRecipe: boolean;
  fetchRecipeError: string | null;

  fetchSavedRecipes: () => Promise<void>;
  fetchRandomRecipe: () => Promise<string | null>;
  fetchRecipeById: (id: string) => Promise<void>;
  addRecipe: (addition: Recipe) => void;
  saveRecipe: (recipeID: string) => Promise<void>;
  reset: () => void;
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set, get) => ({
      recipes: {},
      saved_recipes: [],

      isFetchingRecipe: false,
      fetchRecipeError: null,

      fetchSavedRecipes: async () => {
        const userID = useAuthStore.getState().userID;

        if (!API_URL) {
          console.error("EXPO_PUBLIC_API_URL is missing.");
          return;
        }

        try {
          const response = await fetch(`${API_URL}/ai/cookbook/${userID}/`);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to fetch saved recipes:", errorText);
            throw new Error("Failed to fetch saved recipes.");
          }

          const data = await response.json();
          const fetchedRecipes: Recipe[] = data.recipes ?? [];

          set((state) => {
            const updatedRecipes = { ...state.recipes };
            const updatedSavedIds = new Set(state.saved_recipes);

            fetchedRecipes.forEach((recipe) => {
              updatedRecipes[recipe.recipe_id] = recipe;
              updatedSavedIds.add(recipe.recipe_id);
            });

            return {
              recipes: updatedRecipes,
              saved_recipes: Array.from(updatedSavedIds),
            };
          });
        } catch (error) {
          console.error("Failed to fetch saved recipes:", error);
        }
      },

      fetchRandomRecipe: async () => {
        if (!API_URL) {
          console.error("EXPO_PUBLIC_API_URL is missing.");
          return null;
        }

        try {
          const response = await fetch(`${API_URL}/ai/recipes/random/`);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to fetch random recipe:", errorText);
            throw new Error("Failed to fetch random recipe.");
          }

          const fetchedRecipe: Recipe = await response.json();

          set((state) => ({
            recipes: {
              ...state.recipes,
              [fetchedRecipe.recipe_id]: fetchedRecipe,
            },
          }));

          return fetchedRecipe.recipe_id;
        } catch (error) {
          console.error("Failed to fetch random recipe:", error);
          return null;
        }
      },

      fetchRecipeById: async (id: string) => {
        if (!API_URL) {
          set({
            isFetchingRecipe: false,
            fetchRecipeError: "API URL is missing.",
          });

          throw new Error("EXPO_PUBLIC_API_URL is missing.");
        }

        if (get().recipes[id]) {
          console.log("Recipe loaded from cache:", id);
          return;
        }

        const url = `${API_URL}/ai/recipes/${id}/`;

        console.log("FETCHING RECIPE URL:", url);

        set({
          isFetchingRecipe: true,
          fetchRecipeError: null,
        });

        try {
          const response = await fetch(url);

          console.log("FETCH RECIPE STATUS:", response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.log("FETCH RECIPE ERROR BODY:", errorText);
            throw new Error("Failed to fetch recipe.");
          }

          const fetchedRecipe: Recipe = await response.json();

          console.log("FETCHED RECIPE:", fetchedRecipe);

          set((state) => ({
            recipes: {
              ...state.recipes,
              [id]: fetchedRecipe,
            },
            isFetchingRecipe: false,
            fetchRecipeError: null,
          }));
        } catch (error) {
          console.error("Failed to fetch recipe:", error);

          set({
            isFetchingRecipe: false,
            fetchRecipeError: "Failed to fetch recipe.",
          });

          throw error;
        }
      },

      addRecipe: (addition: Recipe) => {
        set((state) => ({
          recipes: {
            ...state.recipes,
            [addition.recipe_id]: addition,
          },
        }));
      },

      saveRecipe: async (recipeID: string) => {
        const alreadySaved = get().saved_recipes.includes(recipeID);
        if (alreadySaved) return;

        set((state) => ({
          saved_recipes: [recipeID, ...state.saved_recipes],
        }));

        if (!API_URL) {
          console.error("EXPO_PUBLIC_API_URL is missing.");

          set((state) => ({
            saved_recipes: state.saved_recipes.filter((id) => id !== recipeID),
          }));

          return;
        }

        const userID = useAuthStore.getState().userID;

        try {
          const response = await fetch(`${API_URL}/ai/cookbook/save/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userID,
              recipe_id: recipeID,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to save recipe:", errorText);
            throw new Error("Failed to save recipe.");
          }
        } catch (error) {
          console.error("Save failed, rolling back local state:", error);

          set((state) => ({
            saved_recipes: state.saved_recipes.filter((id) => id !== recipeID),
          }));
        }
      },

      reset: () => {
        set({
          recipes: {},
          saved_recipes: [],
          isFetchingRecipe: false,
          fetchRecipeError: null,
        });
      },
    }),
    {
      name: "recipe-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);