import { create } from "zustand" //in memory state management
import { persist, createJSONStorage } from "zustand/middleware" //save state to device storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CheckListEntry {
    id: string;
    label: string;
    isChecked: boolean;
}

interface UserProfileDatabaseResponse {
    difficulty: number;
    diets: CheckListEntry[];
    tools: CheckListEntry[];
}

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
  
};

export const useCustomizeProfileStore = create(     //zustand creates a store
    persist<CustomizeProfileState>(                 //persist saves to device storage
        (set) => ({                                 //set is zustand's internal update function
            
            //Diet Checklist
            dietOptions: [],
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
            cookingExperienceValue: '',
            cookingExperienceIndex: 0,
            setCookingExperience: (value, index) => set({
                cookingExperienceValue: value,
                cookingExperienceIndex: index,
            }),

            //Kitchen Tools Checklist
            kitchenTools: [],
            toggleKitchenTool: (id) => set((state) => ({
                kitchenTools: state.kitchenTools.map((tool) =>
                    tool.id === id
                        ? { ...tool, isChecked: !tool.isChecked }
                        : tool
                ),
            })),

            //Database Integration
            fetchUserProfile: async () => {
                //This will call the backend API
                //It will return all user profile data at once

                //For now here's some pretend data to allow the components to work
                const mockDatabaseResponse: UserProfileDatabaseResponse = {
                    difficulty: 1,
                    diets: [
                        { id: 'vegan', label: 'Vegan', isChecked: false },
                        { id: 'vegetarian', label: 'Vegetarian', isChecked: true },
                        { id: 'keto', label: 'Keto', isChecked: false },
                        { id: 'paleo', label: 'Paleo', isChecked: false },
                        { id: 'gluten_free', label: 'Gluten-Free', isChecked: true },
                        { id: 'dairy_free', label: 'Dairy-Free', isChecked: false },
                    ],
                    tools: [
                        { id: 'oven', label: 'Oven', isChecked: true },
                        { id: 'microwave', label: 'Microwave', isChecked: true },
                        { id: 'gas_stovetop', label: 'Gas Stovetop', isChecked: false },
                        { id: 'induction_stovetop', label: 'Induction Stovetop', isChecked: false },
                        { id: 'air_fryer', label: 'Air Fryer', isChecked: true },
                        { id: 'cast_iron', label: 'Cast Iron Cookware', isChecked: false },
                        { id: 'stainless_steel', label: 'Stainless Steel Cookware', isChecked: false },
                        { id: 'nonstick', label: 'Nonstick Cookware', isChecked: true },
                        { id: 'blender', label: 'Blender', isChecked: true },
                        { id: 'food_processor', label: 'Food Processor', isChecked: false },
                        { id: 'stand_mixer', label: 'Stand Mixer', isChecked: false },
                        { id: 'mandoline', label: 'Mandoline', isChecked: false },
                        { id: 'food_scale', label: 'Food Scale', isChecked: true },
                    ]
                };

                set({
                    dietOptions: mockDatabaseResponse.diets,
                    kitchenTools: mockDatabaseResponse.tools,
                });
            }
        }),
        {                                           //define the persist config
            name: "customize-profile-storage", 
            storage: createJSONStorage(() => AsyncStorage), //Using async storage (not encrypted, faster)
        }
    )
);