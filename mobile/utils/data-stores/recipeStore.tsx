import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware" //save state to device storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '@/src/types/dataTypes';

//
// Notes:
//
/*
This store will cache all of the recipes that we fetch from the database.

We search for a recipe with: recipes[id]
    - This will be undefined if that id is not cached
    - This will return the recipe data when it is cached

If the searched id is alrady saved, the data is loaded from the local device storage.

If the searched id is not saved, the data is fetched from the databse and then saved.

The data is cached to speed up the app, reduce backend load, and allow offline recipes.

However, currently this means that if a change is made to the recipe directly in database,
it will not propogate to the user, and they will still see the old cached version.

But for now I don't see a big problem, since the user is supposed to be the one 
defining when changes are made to the recipe. And in this case, we can update the 
recipe when a change is requested. 
*/
const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface RecipeStore {
  recipes: Record<string, Recipe>;
  saved_recipes: Recipe[];

  isFetchingRecipe: boolean;
  fetchRecipeError: string | null;

  getSavedRecipes: () => Promise<void>;
  fetchRecipeById: (id: string) => Promise<void>;
  wipeRecipeStore: () => void;
}
export const useRecipeStore = create(
  persist<RecipeStore>(
    (set, get) => ({
      recipes: {},
      saved_recipes: [],

      isFetchingRecipe: false,
      fetchRecipeError: null,

      getSavedRecipes: async () => {
        // Later:
        // fetch user's saved recipes from Django
      },

      fetchRecipeById: async (id: string) => {
        if (!API_URL) {
    set({
      isFetchingRecipe: false,
      fetchRecipeError: "API URL is missing.",
    });

    throw new Error("EXPO_PUBLIC_API_URL is missing.");
        }
    
        // If already cached, do not fetch again
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

      wipeRecipeStore: () => {
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