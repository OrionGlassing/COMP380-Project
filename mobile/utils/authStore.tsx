import { create } from "zustand";   //in memory state management
import { persist, createJSONStorage } from "zustand/middleware"; //save state to device storage
import { getItem, setItem, deleteItemAsync } from "expo-secure-store";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

interface UserState {
    isLoggedIn: boolean;
    hasCompletedTutorial: boolean;
    userID: string | null;
    token: string | null;
    hydrated: boolean;
    logIn: (username: string, password: string) => Promise<void>;
    createNewAccount: (username: string, email: string, password: string) => Promise<void>;
    logOut: () => void;
    completeTutorial: () => void;
    setHydrated: (value: boolean) => void;
}

const storage = createJSONStorage(() => ({
  getItem: async (name: string) => {
    if (Platform.OS === "web") {
      return localStorage.getItem(name);
    }
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    if (Platform.OS === "web") {
      localStorage.setItem(name, value);
      return;
    }
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    if (Platform.OS === "web") {
      localStorage.removeItem(name);
      return;
    }
    await SecureStore.deleteItemAsync(name);
  },
}));

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      hasCompletedTutorial: false,
      userID: null,
      token: null,
      hydrated: false,

      setHydrated: (value) => set({ hydrated: value }),

      logIn: async (_username, _password) => {
        set({
          isLoggedIn: true,
          hasCompletedTutorial: true,
        });
      },

      createNewAccount: async (_username, _email, _password) => {
        set({
          isLoggedIn: true,
          hasCompletedTutorial: false,
        });
      },

      logOut: () => {
        set({
          isLoggedIn: false,
          userID: null,
          token: null,
        });
      },

      completeTutorial: () => {
        set({
          hasCompletedTutorial: true,
        });
      },
    }),
    {
      name: "auth-store",
      storage,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);