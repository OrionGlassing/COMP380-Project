import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CheckListEntry } from "@/src/types/dataTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserProfileDatabaseResponse {
  difficulty: number;
  diets: CheckListEntry[];
  tools: CheckListEntry[];

  dietDescription: string;
  allergyDescription: string;
  lovedIngredientsDescription: string;
  hatedIngredientsDescription: string;
}

interface UpdateUserProfileRequest {
  difficulty: number;
  diets: CheckListEntry[];
  tools: CheckListEntry[];

  dietDescription: string;
  allergyDescription: string;
  lovedIngredientsDescription: string;
  hatedIngredientsDescription: string;
}

interface CustomizeProfileState {
  // Diet Checklist
  dietOptions: CheckListEntry[];
  toggleDiet: (id: string) => void;

  // Describe your diet TextBox
  dietDescription: string;
  setDietDescription: (value: string) => void;

  // Food allergies TextBox
  allergyDescription: string;
  setAllergyDescription: (value: string) => void;

  // Loved ingredients TextBox
  lovedIngredientsDescription: string;
  setLovedIngredientsDescription: (value: string) => void;

  // Hated ingredients TextBox
  hatedIngredientsDescription: string;
  setHatedIngredientsDescription: (value: string) => void;

  // Experience Level Slider
  cookingExperienceValue: string;
  cookingExperienceIndex: number;
  setCookingExperience: (value: string, index: number) => void;

  // Kitchen tools Checklist
  kitchenTools: CheckListEntry[];
  toggleKitchenTool: (id: string) => void;

  // Database Integration
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: () => Promise<void>;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useCustomizeProfileStore = create(
  persist<CustomizeProfileState>(
    (set, get) => ({
      // Diet Checklist
      dietOptions: [],
      toggleDiet: (id) =>
        set((state) => ({
          dietOptions: state.dietOptions.map((diet) =>
            diet.id === id
              ? { ...diet, isChecked: !diet.isChecked }
              : diet,
          ),
        })),

      // Diet Description
      dietDescription: "",
      setDietDescription: (value) =>
        set({
          dietDescription: value,
        }),

      // Allergy Description
      allergyDescription: "",
      setAllergyDescription: (value) =>
        set({
          allergyDescription: value,
        }),

      // Loved Ingredients
      lovedIngredientsDescription: "",
      setLovedIngredientsDescription: (value) =>
        set({
          lovedIngredientsDescription: value,
        }),

      // Hated Ingredients
      hatedIngredientsDescription: "",
      setHatedIngredientsDescription: (value) =>
        set({
          hatedIngredientsDescription: value,
        }),

      // Experience Level Slider
      cookingExperienceValue: "",
      cookingExperienceIndex: 0,
      setCookingExperience: (value, index) =>
        set({
          cookingExperienceValue: value,
          cookingExperienceIndex: index,
        }),

      // Kitchen Tools Checklist
      kitchenTools: [],
      toggleKitchenTool: (id) =>
        set((state) => ({
          kitchenTools: state.kitchenTools.map((tool) =>
            tool.id === id
              ? { ...tool, isChecked: !tool.isChecked }
              : tool,
          ),
        })),

      // Database Integration
      fetchUserProfile: async () => {
        console.log("Fetching profile from:", `${API_URL}/auth/profile/`);
      
        const response = await fetch(`${API_URL}/auth/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      
        if (!response.ok) {
          const errorText = await response.text();
      
          console.log("Failed to fetch user profile");
          console.log("Status:", response.status);
          console.log("Body:", errorText);
      
          throw new Error(`Failed to fetch user profile: ${response.status}`);
        }
      
        const data: UserProfileDatabaseResponse = await response.json();
      
        console.log("Fetched profile:", data);
      
        set({
          dietOptions: data.diets ?? [],
          kitchenTools: data.tools ?? [],
      
          dietDescription: data.dietDescription ?? "",
          allergyDescription: data.allergyDescription ?? "",
          lovedIngredientsDescription: data.lovedIngredientsDescription ?? "",
          hatedIngredientsDescription: data.hatedIngredientsDescription ?? "",
      
          cookingExperienceIndex: data.difficulty ?? 0,
        });
      },
      
      updateUserProfile: async () => {
        const state = get();
      
        const payload: UpdateUserProfileRequest = {
          difficulty: state.cookingExperienceIndex,
      
          diets: state.dietOptions,
          tools: state.kitchenTools,
      
          dietDescription: state.dietDescription,
          allergyDescription: state.allergyDescription,
          lovedIngredientsDescription: state.lovedIngredientsDescription,
          hatedIngredientsDescription: state.hatedIngredientsDescription,
        };
      
        console.log("Updating profile at:", `${API_URL}/auth/profile/`);
        console.log("Payload:", payload);
      
        const response = await fetch(`${API_URL}/auth/profile/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      
        if (!response.ok) {
          const errorText = await response.text();
      
          console.log("Failed to update user profile");
          console.log("Status:", response.status);
          console.log("Body:", errorText);
      
          throw new Error(`Failed to update user profile: ${response.status}`);
        }
      
        const updatedData: UserProfileDatabaseResponse = await response.json();
      
        console.log("Updated profile:", updatedData);
      
        set({
          dietOptions: updatedData.diets ?? [],
          kitchenTools: updatedData.tools ?? [],
      
          dietDescription: updatedData.dietDescription ?? "",
          allergyDescription: updatedData.allergyDescription ?? "",
          lovedIngredientsDescription:
            updatedData.lovedIngredientsDescription ?? "",
          hatedIngredientsDescription:
            updatedData.hatedIngredientsDescription ?? "",
      
          cookingExperienceIndex: updatedData.difficulty ?? 0,
        });
      },
    }),
    {
      name: "customize-profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);