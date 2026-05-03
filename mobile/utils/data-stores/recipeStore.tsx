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

interface RecipeStore {
  recipes: Record<string, Recipe>;
  saved_recipes: Recipe[];
  getSavedRecipes: () => Promise<void>;
  fetchRecipeById: (id: string) => Promise<void>; 
  wipeRecipeStore: () => void;
}

const testRecipeData: Recipe = {
    recipe_id: "testID",
    title: "Test Recipe Title",
    imageURL: "https://firebasestorage.googleapis.com/v0/b/cokitchen-2dea8.firebasestorage.app/o/recipe_images%2Fpad_see_ew_001%2Fpad-see-ew-sq-cu.jpg?alt=media&token=62019e0e-f350-4228-870c-346aaf6e5457",
    ingredients: [
        'Test Ingredient #1 - 2 cups',
        'Test Ingredient #2 - 1/2 cup',
        'Test Ingredient #3 - x2',
        'Test Ingredient #4 - 3 Tbsp.',
        'Test Ingredient #5 - 1 tsp.',
    ],
    directions: [
        "1. Example step one...",
        "2. Example step two...",
        "3. Example step three...",
        "4. Example step four...",
        "5. Example step five...",
    ],
    cook_time: "25 minutes",
};

export const useRecipeStore = create(     //zustand creates a store
    persist<RecipeStore>(                 //persist saves to device storage
        (set, get) => ({                  //set is zustand's internal update function
            
            recipes: {},
            saved_recipes: [],

            getSavedRecipes: async () => {
                //Get all of the users saved recipes from the database
                
            },

            fetchRecipeById: async (id: string) => {
            // Check if this recipe id is already saved
            //if (get().recipes[id]) return;
            
            /* When we have the API link, we can actually use this section
            try {
                // If it's not saved, fetch it from the database
                const response = await fetch(`ourAPIlink/recipes/${id}`);
                const fetchedRecipe = await response.json();

                // Add the new fetched recipe to the zustand store
                set((state) => ({
                recipes: {
                    ...state.recipes,
                    [id]: fetchedRecipe
                }
                }));
            } catch (error) {
                console.error("Failed to fetch recipe:", error);
                // More error handling will want to go here
            }
            */

            //For now, here's some temporary data to test with
            set((state) => ({
                recipes: {
                    ...state.recipes,
                    [id]: testRecipeData
                }
            }));

            },
            wipeRecipeStore: () => {
                set((state) => ({
                    recipes: {},
                    saved_recipes: [],
                }));
            }
        }),
        {                                           //define the persist config
            name: "recipe-storage", 
            storage: createJSONStorage(() => AsyncStorage), //Using async storage (not encrypted, faster)
        }
    )
);