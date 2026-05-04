import { create } from "zustand" //in memory state management
import { CheckListEntry } from "@/src/types/dataTypes";
import { useAuthStore } from "../authStore";

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
    submitError: boolean;
    submitNewRecipe: () => Promise<string>;
    reset: () => void;
}

const CheckListData = {
    recipeOptions: [
        { id: 'breakfast', label: 'Breakfast', isChecked: false },
        { id: 'lunch', label: 'Lunch', isChecked: false },
        { id: 'dinner', label: 'Dinner', isChecked: false },
        { id: 'dessert', label: 'Dessert', isChecked: false },
        { id: 'baking', label: 'Baking', isChecked: false },
        { id: 'snack', label: 'Snack', isChecked: false },
        { id: 'drink', label: 'Drink', isChecked: false },
        { id: 'specialevent', label: 'Special Event', isChecked: false },
    ],
    cuisineOptions: [
        { id: 'american', label: 'American', isChecked: false },
        { id: 'mexican', label: 'Mexican', isChecked: false },
        { id: 'italian', label: 'Italian', isChecked: false },
        { id: 'french', label: 'French', isChecked: false },
        { id: 'greek', label: 'Greek', isChecked: false },
        { id: 'chinese', label: 'Chinese', isChecked: false },
        { id: 'japanese', label: 'Japanese', isChecked: false },
        { id: 'thai', label: 'Thai', isChecked: false },
        { id: 'korean', label: 'Korean', isChecked: false },
        { id: 'indian', label: 'Indian', isChecked: false },
    ],
    seasonOptions: [
        { id: 'fall', label: 'Fall', isChecked: false },
        { id: 'winter', label: 'Winter', isChecked: false },
        { id: 'spring', label: 'Spring', isChecked: false },
        { id: 'summer', label: 'Summer', isChecked: false },
    ]
};

export const useCreateNewRecipeStore = create<CreateNewRecipeState>((set, get, store) => ({
    //Recipe Type Checklist
    recipeTypeOptions: CheckListData.recipeOptions,
    toggleRecipeOption: (id) => set((state) => ({
                recipeTypeOptions: state.recipeTypeOptions.map((type) =>
                    type.id === id
                        ? { ...type, isChecked: !type.isChecked }
                        : type
                ),
            })),

    //Cuisine Type Checklist
    cuisineTypeOptions: CheckListData.cuisineOptions,
    toggleCuisineOption: (id) => set((state) => ({
                cuisineTypeOptions: state.cuisineTypeOptions.map((type) =>
                    type.id === id
                        ? { ...type, isChecked: !type.isChecked }
                        : type
                ),
            })),

    //Season Type Checklist
    seasonTypeOptions: CheckListData.seasonOptions,
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
    submitError: false,
    submitNewRecipe: async () => {
        set({isSubmitting: true, submitError: false});

        const state = get();
        const userID = useAuthStore.getState().userID;

        const payload = {
            //User info
            creatorID: userID,

            //Filter only checked items, then map them to just an array of labels
            recipeTypes: state.recipeTypeOptions.filter((opt: CheckListEntry) => opt.isChecked).map((opt: CheckListEntry) => opt.label),
            cuisineTypes: state.cuisineTypeOptions.filter((opt: CheckListEntry) => opt.isChecked).map((opt: CheckListEntry) => opt.label),
            seasonTypes: state.seasonTypeOptions.filter((opt: CheckListEntry) => opt.isChecked).map((opt: CheckListEntry) => opt.label),
            
            //Grab the raw values
            spiceLevel: state.spiceLevelValue,
            sweetnessLevel: state.sweetnessLevelValue,
            complexity: state.recipeComplexityValue,
            timeLimit: state.recipeTimeValue,
            description: state.recipeDescription,
        };

        try {
            const response = await fetch('ourAPIlink/recipes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Error making new recipe!');
            }

            const data = await response.json();

            set({ isSubmitting: false });

            state.reset();

            return data.recipeId;

        } catch (error) {
            set({ isSubmitting: false, submitError: true});
            console.error("Error submitting new recipe: ", error);
            return null;
            //This wants to trip a value that the loading recipe page wants to lsiten to
            //When it trips, the loading page will know that something went wrong
            //And then it will provide an exit option (or mayebe retry button too)
        }

        //For now it returns 2 for testing purposes
        return "2";
    },

    reset: () => set(store.getInitialState()),
}));