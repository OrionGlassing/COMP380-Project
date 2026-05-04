import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware" //save state to device storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '@/src/types/dataTypes';
import { useAuthStore } from '../authStore';

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

NEW FEATURES: (Saved Recipe List & Random Recipe Grab)

Saved Recipes (Cookbook page):
saved_recipes is a string array of recipe ID's. When getSavedRecipes is called,
the reteived recipes will be added to the recipes record like the rest, AND the 
ID's of all of the users saved recipes are added to saved_recipes.

When getSavedRecipes is used on the cookbook page, the saved_recipes array updates
with ID's, for every ID in the array, a card will be rendered. The cards will work totally the same as before
since the recipes all exist in the same place (recipe record).

Random Recipes (Explore page):
getRandomRecipe calls the backend function to get a random recipe. When the recipe is retreived
it is saved to the recipe record like the rest. The function returns the string ID of the
recipe that was retreived.

When getRandomRecipe is used on the expolore page, a local string array will be used to
track the string ID's of all of the recipes that are grabbed and stored in the recipe record.
For every ID in the array, a card is rendered like normal. Since the array is local
to the page, the list of random recipes will get wiped, but the recipes are saved in record.
*/

interface RecipeStore {
  recipes: Record<string, Recipe>;
  saved_recipes: string[];
  fetchSavedRecipes: () => Promise<void>;
  fetchRandomRecipe: () => Promise<string | null>;
  fetchRecipeById: (id: string) => Promise<void>; 
  addRecipe: (addition: Recipe) => void;
  saveRecipe: (recipeID: string) => Promise<void>;
  reset: () => void;
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
        (set, get, store) => ({                  //set is zustand's internal update function
            
            recipes: {},
            saved_recipes: [],

            fetchSavedRecipes: async () => {
                //Get all of the users saved recipes from the database
                const userID = useAuthStore.getState().userID;
                try {
                    //Fetch all of the users saved recipes from the backend (userID is passed in)
                    //This is meant to return an array of recipe datatypes
                    const response = await fetch(`ourAPIlink/cookbook/${userID}/`);
                    const data = await response.json();
                    const fetchedRecipes: Recipe[] = data.recipes;

                    //Batch update the zustand state (one re-render)
                    set((state) => {
                        const updatedRecipes = { ...state.recipes };
                        const updatedSavedIds = new Set(state.saved_recipes); //Set skips duplicate ID's

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
                try {
                    //Fetch the random recipe
                    const response = await fetch(`ourAPIlink/recipes/random/`);
                    const fetchedRecipe: Recipe = await response.json();

                    set((state) => ({
                        recipes: {
                            ...state.recipes,
                            [fetchedRecipe.recipe_id]: fetchedRecipe
                        }
                    }));

                    return fetchedRecipe.recipe_id;
                } catch (error) {
                    console.error("Failed to fetch random recipe:", error);
                    return null;
                }
            },

            fetchRecipeById: async (id: string) => {
            // Check if this recipe id is already saved
            if (get().recipes[id]) return;
            
            try {
                // If it's not saved, fetch it from the database
                const response = await fetch(`ourAPIlink/recipes/${id}`);
                const fetchedRecipe = await response.json();

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

            //For now, here's some temporary data to test with
            set((state) => ({
                recipes: {
                    ...state.recipes,
                    [id]: testRecipeData
                }
            }));
            },

            addRecipe: (addition) => {
                set((state) => ({
                    recipes: {
                        ...state.recipes,
                        [addition.recipe_id]: addition
                    }
                }));
            },

            saveRecipe: async (recipeID) => {
                //Check if already saved
                const alreadySaved = get().saved_recipes.includes(recipeID);
                if (alreadySaved) return;

                //Save recipe on frontend (optimistic, will roll back if failed)
                set((state) => ({
                    saved_recipes: [recipeID, ...state.saved_recipes]
                }));

                const userID = useAuthStore.getState().userID;
                try {
                    const response = await fetch(`ourAPIlink/cookbook/save/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            user_id: userID, 
                            recipe_id: recipeID 
                        }),
                    });

                    if (!response.ok) throw new Error("Failed to save to database");

                } catch (error) {
                    console.error("Save failed, rolling back local state:", error);
                    
                    //If backend failed to save, rollback frontend save
                    set((state) => ({
                        saved_recipes: state.saved_recipes.filter(id => id !== recipeID)
                    }));
                }
            },

            reset: () => set(store.getInitialState()),
        }),
        {                                           //define the persist config
            name: "recipe-storage", 
            storage: createJSONStorage(() => AsyncStorage), //Using async storage (not encrypted, faster)
        }
    )
);