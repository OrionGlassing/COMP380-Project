import { create } from "zustand" //in memory state management
import { persist, createJSONStorage } from "zustand/middleware" //save state to device storage
import { CheckListEntry } from "@/src/types/dataTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from "../authStore";

//
// Notes
//
/*
The previous approach was poorly planned on my behalf. It involved having the database control
which options were available for checklists, and knowing the UI state of the checklists & sliders.
For some reason it made sense at the time, but this is obviously not the best appraoch.

The new approach gives the frontend control over the options for the fields in the users profile,
while the database only knows the actual string value of each field.

Because of this, the checkbox and slider UI components now need methods of initializing
to the correct state when the users profile data is retreived from the database.

*/

//The options that the checklists and sliders have for the customize-profile page
const ProfileDataOptions = {
    diets:  [
        { id: 'vegan', label: 'Vegan', isChecked: false },
        { id: 'vegetarian', label: 'Vegetarian', isChecked: false },
        { id: 'keto', label: 'Keto', isChecked: false },
        { id: 'paleo', label: 'Paleo', isChecked: false },
        { id: 'gluten_free', label: 'Gluten-Free', isChecked: false },
        { id: 'dairy_free', label: 'Dairy-Free', isChecked: false },
    ] as CheckListEntry[],
    tools: [
        { id: 'oven', label: 'Oven', isChecked: false },
        { id: 'microwave', label: 'Microwave', isChecked: false },
        { id: 'gas_stovetop', label: 'Gas Stovetop', isChecked: false },
        { id: 'induction_stovetop', label: 'Induction Stovetop', isChecked: false },
        { id: 'air_fryer', label: 'Air Fryer', isChecked: false },
        { id: 'slow_cooker', label: 'Slow Cooker', isChecked: false },
        { id: 'cast_iron', label: 'Cast Iron Cookware', isChecked: false },
        { id: 'stainless_steel', label: 'Stainless Steel Cookware', isChecked: false },
        { id: 'nonstick', label: 'Nonstick Cookware', isChecked: false },
        { id: 'blender', label: 'Blender', isChecked: false },
        { id: 'food_processor', label: 'Food Processor', isChecked: false },
        { id: 'stand_mixer', label: 'Stand Mixer', isChecked: false },
        { id: 'mandoline', label: 'Mandoline', isChecked: false },
        { id: 'food_scale', label: 'Food Scale', isChecked: false },
    ] as CheckListEntry[],
    cookingExperienceLevels: ["Noob", "Beginner", "Average", "Experienced", "Pro"],
};

interface CustomizeProfileState {
    //Diet Checklist:
    dietOptions: CheckListEntry[];
    toggleDiet: (id: string) => void;

    //Describe your diet TextBox:
    dietDescription: string;
    setDietDescription: (value: string) => void;
    
    //Food allergies TextBox:
    allergyDescription: string;
    setAllergyDescription: (value: string) => void;

    //Loved ingredients TextBox:
    lovedIngredientsDescription: string;
    setLovedIngredientsDescription: (value: string) => void;

    //Hated ingredients TextBox:
    hatedIngredientsDescription: string;
    setHatedIngredientsDescription: (value: string) => void;

    //Experience Level Slider:
    cookingExperienceValue: string;
    cookingExperienceIndex: number;
    setCookingExperience: (value: string, index: number) => void;

    //Kitchen tools Checklist:
    kitchenTools: CheckListEntry[];
    toggleKitchenTool: (id: string) => void;

    //Database Integration:
    fetchUserProfile: () => Promise<void>;
    submitUserProfile: () => Promise<void>;
    reset: () => void;
  
};

export const useCustomizeProfileStore = create(     //zustand creates a store
    persist<CustomizeProfileState>(                 //persist saves to device storage
        (set, get, store) => ({                     //set is zustand's internal update function
            
            //
            //Initialize fields and define setter functions
            //

            //Diet Checklist
            dietOptions: ProfileDataOptions.diets,
            toggleDiet: (id) => set((state) => ({
                dietOptions: state.dietOptions.map((diet) =>
                    diet.id === id
                        ? { ...diet, isChecked: !diet.isChecked }
                        : diet
                ),
            })),

            //Diet Description
            dietDescription: "",
            setDietDescription: (value) => set({
                dietDescription: value,
            }),

            //Allergy Description
            allergyDescription: "",
            setAllergyDescription: (value) => set({
                allergyDescription: value,
            }),

            //Loved Ingredients
            lovedIngredientsDescription: "",
            setLovedIngredientsDescription: (value) => set({
                lovedIngredientsDescription: value,
            }),

            //Hated Ingredients
            hatedIngredientsDescription: "",
            setHatedIngredientsDescription: (value) => set({
                hatedIngredientsDescription: value,
            }),

            //Experience Level Slider
            cookingExperienceValue: 'Average',
            cookingExperienceIndex: 2,
            setCookingExperience: (value, index) => set({
                cookingExperienceValue: value,
                cookingExperienceIndex: index,
            }),

            //Kitchen Tools Checklist
            kitchenTools: ProfileDataOptions.tools,
            toggleKitchenTool: (id) => set((state) => ({
                kitchenTools: state.kitchenTools.map((tool) =>
                    tool.id === id
                        ? { ...tool, isChecked: !tool.isChecked }
                        : tool
                ),
            })),

            //
            //Database Integration
            //

            fetchUserProfile: async () => {
                const userID = useAuthStore.getState().userID;
                try {
                    const response = await fetch(`ourAPIlink/${userID}/`);
                    const data = await response.json();

                    set((state) => {
                        //Hydrate the diets checklist
                        //(set diet option to checked if it's label is in the database response)
                        const newDietOptions = ProfileDataOptions.diets.map(opt => ({
                            ...opt,
                            isChecked: data.diets?.includes(opt.label) || false
                        }));

                        //Hydrate the tools checklist
                        //(set tool option to checked if it's label is in the database response)
                        const newKitchenTools = ProfileDataOptions.tools.map(opt => ({
                            ...opt,
                            isChecked: data.tools?.includes(opt.label) || false
                        }));

                        //Hydrate the experience slider
                        //(check for the index of the string in the options array)
                        //If this fails it returns -1
                        const experienceIndex = ProfileDataOptions.cookingExperienceLevels.indexOf(data.experienceLevel);

                        return {
                            dietOptions:                    newDietOptions,
                            dietDescription:                data.dietDescription || "",
                            allergyDescription:             data.allergyDescription || "",
                            lovedIngredientsDescription:    data.lovedIngredientsDescription || "",
                            hatedIngredientsDescription:    data.hatedIngredientsDescription || "",
                            cookingExperienceValue:         data.experienceLevel || ProfileDataOptions.cookingExperienceLevels[2],
                            cookingExperienceIndex:         experienceIndex == -1 ? 2 : experienceIndex,
                            kitchenTools:                   newKitchenTools,
                        };
                    });
                } catch (error) {
                    //console.error("User profile settings fetch failed:", error);
                }
            },

            submitUserProfile: async () => {
                const userID = useAuthStore.getState().userID;
                const state = get();

                //Set up the payload, converting checklists and sliders to string values
                const payload = {
                    diets:                          state.dietOptions.filter(d => d.isChecked).map(d => d.label),
                    dietDescription:                state.dietDescription,
                    allergyDescription:             state.allergyDescription,
                    lovedIngredientsDescription:    state.lovedIngredientsDescription,
                    hatedIngredientsDescription:    state.hatedIngredientsDescription,
                    experienceLevel:                state.cookingExperienceValue,
                    tools:                          state.kitchenTools.filter(d => d.isChecked).map(d => d.label),
                };

                try { 
                    await fetch(`ourAPIlink/${userID}/`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    });
                } catch(error) {
                    console.error("Failed to submit profile data:", error);
                }
            },

            reset: () => set(store.getInitialState()),
        }),
        {                                           //define the persist config
            name: "customize-profile-storage", 
            storage: createJSONStorage(() => AsyncStorage), //Using async storage (not encrypted, faster)
        }
    )
);