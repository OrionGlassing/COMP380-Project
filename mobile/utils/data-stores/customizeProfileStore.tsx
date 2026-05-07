import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckListEntry } from "@/src/types/dataTypes";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface UserProfileDatabaseResponse {
  difficulty?: number;
  diets?: string[] | CheckListEntry[];
  tools?: string[] | CheckListEntry[];

  dietDescription?: string;
  allergyDescription?: string;
  lovedIngredientsDescription?: string;
  hatedIngredientsDescription?: string;
}

interface UpdateUserProfileRequest {
  difficulty: number;
  diets: string[];
  tools: string[];

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
  reset: () => void;
}

const ProfileDataOptions = {
  diets: [
    { id: "vegan", label: "Vegan", isChecked: false },
    { id: "vegetarian", label: "Vegetarian", isChecked: false },
    { id: "keto", label: "Keto", isChecked: false },
    { id: "paleo", label: "Paleo", isChecked: false },
    { id: "gluten_free", label: "Gluten-Free", isChecked: false },
    { id: "dairy_free", label: "Dairy-Free", isChecked: false },
  ] as CheckListEntry[],

  tools: [
    { id: "oven", label: "Oven", isChecked: false },
    { id: "microwave", label: "Microwave", isChecked: false },
    { id: "gas_stovetop", label: "Gas Stovetop", isChecked: false },
    { id: "induction_stovetop", label: "Induction Stovetop", isChecked: false },
    { id: "air_fryer", label: "Air Fryer", isChecked: false },
    { id: "slow_cooker", label: "Slow Cooker", isChecked: false },
    { id: "cast_iron", label: "Cast Iron Cookware", isChecked: false },
    { id: "stainless_steel", label: "Stainless Steel Cookware", isChecked: false },
    { id: "nonstick", label: "Nonstick Cookware", isChecked: false },
    { id: "blender", label: "Blender", isChecked: false },
    { id: "food_processor", label: "Food Processor", isChecked: false },
    { id: "stand_mixer", label: "Stand Mixer", isChecked: false },
    { id: "mandoline", label: "Mandoline", isChecked: false },
    { id: "food_scale", label: "Food Scale", isChecked: false },
  ] as CheckListEntry[],

  cookingExperienceLevels: ["Noob", "Beginner", "Average", "Experienced", "Pro"],
};

const getInitialProfileState = () => ({
  dietOptions: ProfileDataOptions.diets.map((diet) => ({ ...diet })),
  kitchenTools: ProfileDataOptions.tools.map((tool) => ({ ...tool })),

  dietDescription: "",
  allergyDescription: "",
  lovedIngredientsDescription: "",
  hatedIngredientsDescription: "",

  cookingExperienceValue: "Average",
  cookingExperienceIndex: 2,
});

const normalizeChecklist = (
  options: CheckListEntry[],
  savedValues?: string[] | CheckListEntry[],
): CheckListEntry[] => {
  if (!savedValues) {
    return options.map((option) => ({
      ...option,
      isChecked: false,
    }));
  }

  const savedLabels = savedValues.map((item) =>
    typeof item === "string" ? item : item.label,
  );

  return options.map((option) => ({
    ...option,
    isChecked: savedLabels.includes(option.label),
  }));
};

export const useCustomizeProfileStore = create<CustomizeProfileState>()(
  persist(
    (set, get) => ({
      ...getInitialProfileState(),

      toggleDiet: (id) =>
        set((state) => ({
          dietOptions: state.dietOptions.map((diet) =>
            diet.id === id
              ? { ...diet, isChecked: !diet.isChecked }
              : diet,
          ),
        })),

      setDietDescription: (value) =>
        set({
          dietDescription: value,
        }),

      setAllergyDescription: (value) =>
        set({
          allergyDescription: value,
        }),

      setLovedIngredientsDescription: (value) =>
        set({
          lovedIngredientsDescription: value,
        }),

      setHatedIngredientsDescription: (value) =>
        set({
          hatedIngredientsDescription: value,
        }),

      setCookingExperience: (value, index) =>
        set({
          cookingExperienceValue: value,
          cookingExperienceIndex: index,
        }),

      toggleKitchenTool: (id) =>
        set((state) => ({
          kitchenTools: state.kitchenTools.map((tool) =>
            tool.id === id
              ? { ...tool, isChecked: !tool.isChecked }
              : tool,
          ),
        })),

      fetchUserProfile: async () => {
        if (!API_URL) {
          throw new Error("EXPO_PUBLIC_API_URL is missing.");
        }

        const url = `${API_URL}/auth/profile/`;

        console.log("Fetching profile from:", url);

        const response = await fetch(url, {
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

        const difficultyIndex =
          typeof data.difficulty === "number" ? data.difficulty : 2;

        const cookingExperienceValue =
          ProfileDataOptions.cookingExperienceLevels[difficultyIndex] ??
          ProfileDataOptions.cookingExperienceLevels[2];

        set({
          dietOptions: normalizeChecklist(ProfileDataOptions.diets, data.diets),
          kitchenTools: normalizeChecklist(ProfileDataOptions.tools, data.tools),

          dietDescription: data.dietDescription ?? "",
          allergyDescription: data.allergyDescription ?? "",
          lovedIngredientsDescription: data.lovedIngredientsDescription ?? "",
          hatedIngredientsDescription: data.hatedIngredientsDescription ?? "",

          cookingExperienceIndex: difficultyIndex,
          cookingExperienceValue,
        });
      },

      updateUserProfile: async () => {
        if (!API_URL) {
          throw new Error("EXPO_PUBLIC_API_URL is missing.");
        }

        const state = get();

        const payload: UpdateUserProfileRequest = {
          difficulty: state.cookingExperienceIndex,

          diets: state.dietOptions
            .filter((diet) => diet.isChecked)
            .map((diet) => diet.label),

          tools: state.kitchenTools
            .filter((tool) => tool.isChecked)
            .map((tool) => tool.label),

          dietDescription: state.dietDescription,
          allergyDescription: state.allergyDescription,
          lovedIngredientsDescription: state.lovedIngredientsDescription,
          hatedIngredientsDescription: state.hatedIngredientsDescription,
        };

        const url = `${API_URL}/auth/profile/`;

        console.log("Updating profile at:", url);
        console.log("Payload:", payload);

        const response = await fetch(url, {
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

        const difficultyIndex =
          typeof updatedData.difficulty === "number"
            ? updatedData.difficulty
            : state.cookingExperienceIndex;

        const cookingExperienceValue =
          ProfileDataOptions.cookingExperienceLevels[difficultyIndex] ??
          ProfileDataOptions.cookingExperienceLevels[2];

        set({
          dietOptions: normalizeChecklist(
            ProfileDataOptions.diets,
            updatedData.diets,
          ),

          kitchenTools: normalizeChecklist(
            ProfileDataOptions.tools,
            updatedData.tools,
          ),

          dietDescription: updatedData.dietDescription ?? "",
          allergyDescription: updatedData.allergyDescription ?? "",
          lovedIngredientsDescription:
            updatedData.lovedIngredientsDescription ?? "",
          hatedIngredientsDescription:
            updatedData.hatedIngredientsDescription ?? "",

          cookingExperienceIndex: difficultyIndex,
          cookingExperienceValue,
        });
      },

      reset: () => {
        set(getInitialProfileState());
      },
    }),
    {
      name: "customize-profile-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);