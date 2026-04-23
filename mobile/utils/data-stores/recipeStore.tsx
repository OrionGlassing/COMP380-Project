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
  fetchRecipeById: (id: string) => Promise<void>; 
}

const testRecipeData: Recipe = {
    id: "dontusethisid",
    title: "My New Recipe",
    ingredients: ['one', 'two', 'three'],
    steps: "First take ingredient one and then add it with ingredient two. Then bake that for a bit. Finally, add ingredient three on top."
};

export const useRecipeStore = create(     //zustand creates a store
    persist<RecipeStore>(                 //persist saves to device storage
        (set, get) => ({                  //set is zustand's internal update function
            
            recipes: {},

            fetchRecipeById: async (id: string) => {
            // Check if this recipe id is already saved
            if (get().recipes[id]) return;
            
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
            }))

            }
        }),
        {                                           //define the persist config
            name: "recipe-storage", 
            storage: createJSONStorage(() => AsyncStorage), //Using async storage (not encrypted, faster)
        }
    )
);