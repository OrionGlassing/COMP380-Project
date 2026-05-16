import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Recipe } from "@/src/types/dataTypes";
import { useAuthStore } from "../authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface RecipeStore {
  recipes: Record<string, Recipe>;
  user_recipe_ids: string[];

  isFetchingRecipes: boolean;
  fetchRecipesError: string | null;

  fetchUserRecipes: () => Promise<void>;
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
      user_recipe_ids: [],

      isFetchingRecipes: false,
      fetchRecipesError: null,

      fetchUserRecipes: async () => {
        if (!API_URL) {
          set({
            isFetchingRecipes: false,
            fetchRecipesError: "API URL is missing.",
          });

          throw new Error("EXPO_PUBLIC_API_URL is missing.");
        }

        const userID = useAuthStore.getState().userID;

        if (!userID) {
          set({
            isFetchingRecipes: false,
            fetchRecipesError: "User ID is missing.",
          });

          throw new Error("Cannot fetch recipes: userID is missing.");
        }

        set({
          isFetchingRecipes: true,
          fetchRecipesError: null,
        });

        try {
          const response = await fetch(`${API_URL}/ai/cookbook/${userID}/`);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to fetch user recipes:", errorText);
            throw new Error("Failed to fetch user recipes.");
          }

          const data = await response.json();
          const fetchedRecipes: Recipe[] = data.recipes ?? [];

          const updatedRecipes: Record<string, Recipe> = {};
          const updatedRecipeIds: string[] = [];

          const saved_recipes = get().user_recipe_ids;

          fetchedRecipes.forEach((recipe) => {
            const recipeID = String(recipe.recipe_id);

            updatedRecipes[recipeID] = recipe;

            saved_recipes.includes(recipeID) ?
              console.log("Already saved Recipe")
              :
              updatedRecipeIds.push(recipeID);
          });

          set((state) => ({
            recipes: {
              ...state.recipes,
              ...updatedRecipes,
            },
            user_recipe_ids: [...state.user_recipe_ids , ...updatedRecipeIds],
            isFetchingRecipes: false,
            fetchRecipesError: null,
          }));
        } catch (error) {
          console.error("Failed to fetch user recipes:", error);

          set({
            isFetchingRecipes: false,
            fetchRecipesError: "Failed to fetch user recipes.",
          });

          throw error;
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
          const recipeID = String(fetchedRecipe.recipe_id);

          set((state) => ({
            recipes: {
              ...state.recipes,
              [recipeID]: fetchedRecipe,
            },
          }));

          return recipeID;
        } catch (error) {
          console.error("Failed to fetch random recipe:", error);
          return null;
        }
      },

      fetchRecipeById: async (id: string) => {
        if (get().recipes[id]) {
          return;
        }

        if (!API_URL) {
          set({
            fetchRecipesError: "API URL is missing.",
          });

          throw new Error("EXPO_PUBLIC_API_URL is missing.");
        }

        set({
          isFetchingRecipes: true,
          fetchRecipesError: null,
        });

        try {
          const response = await fetch(`${API_URL}/ai/recipes/${id}/`);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to fetch recipe:", errorText);
            throw new Error("Failed to fetch recipe.");
          }

          const fetchedRecipe: Recipe = await response.json();
          const recipeID = String(fetchedRecipe.recipe_id);

          set((state) => ({
            recipes: {
              ...state.recipes,
              [recipeID]: fetchedRecipe,
            },
            isFetchingRecipes: false,
            fetchRecipesError: null,
          }));
        } catch (error) {
          console.error("Failed to fetch recipe:", error);

          set({
            isFetchingRecipes: false,
            fetchRecipesError: "Failed to fetch recipe.",
          });

          throw error;
        }
      },

      addRecipe: (addition: Recipe) => {
        const recipeID = String(addition.recipe_id);

        set((state) => ({
          recipes: {
            ...state.recipes,
            [recipeID]: addition,
          },
          user_recipe_ids: state.user_recipe_ids.includes(recipeID)
            ? state.user_recipe_ids
            : [recipeID, ...state.user_recipe_ids],
        }));
      },

      saveRecipe: async (recipeID: string) => {
        set((state) => ({
          user_recipe_ids: state.user_recipe_ids.includes(recipeID)
            ? state.user_recipe_ids
            : [recipeID, ...state.user_recipe_ids],
        }));
      },

      reset: () => {
        set({
          recipes: {},
          user_recipe_ids: [],
          isFetchingRecipes: false,
          fetchRecipesError: null,
        });
      },
    }),
    {
      name: "recipe-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);