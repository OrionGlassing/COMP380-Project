import { create } from "zustand";   //in memory state management
import { persist, createJSONStorage } from "zustand/middleware"; //save state to device storage
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useRecipeStore } from "./data-stores/recipeStore";
import { useCreateNewRecipeStore } from "./data-stores/createNewRecipeStore";
import { useCustomizeProfileStore } from "./data-stores/customizeProfileStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface UserState {
    hydrated: boolean;                  //Frontend only (prevents that app from briefly routing to the wrong page)
    isLoggedIn: boolean;                //Frontend only (manages routing to app or login pages)
    hasCompletedTutorial: boolean;      //Frontend only (manages routing to app or tutorial flow)
    userID: string | null;              //Users account ID to locate them in the database (backend)
    token: string | null;               //Ticket for backend/database requests (backend)
    setHydrated: (value: boolean) => void;
    logIn: (username: string, password: string) => Promise<void>;
    createNewAccount: (username: string, email: string, password: string) => Promise<void>;
    logOut: () => void;
    completeTutorial: () => void;
    restoreSession: () => void;
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

      logIn: async (email, password) => {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await credential.user.getIdToken();

        const response = await fetch(`${API_URL}/auth/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_token: idToken }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.error || "Login failed");
        }
        console.log(data.error);
        
        set({
          isLoggedIn: true,
          hasCompletedTutorial: true,
          userID: data.user.uid,
          token: idToken,
        });
      },

      createNewAccount: async (username, email, password) => {
        const response = await fetch("http://192.168.1.140:8000/auth/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            display_name: username,
            email,
            password,
          }),
        });

        const data = await response.json();
        console.log("signup status:", response.status);
        console.log("signup data:", data);

        if (!response.ok) {
          throw new Error(data.error || "Signup failed");
        }

        set({
          isLoggedIn: true,
          hasCompletedTutorial: false,
          userID: data.user?.uid ?? null,
          token: data.token ?? null,
        });
      },

      logOut: () => {
        //Reset the other stores
        useRecipeStore.getState().reset();
        useRecipeStore.persist.clearStorage();

        useCreateNewRecipeStore.getState().reset();
        
        useCustomizeProfileStore.getState().reset();
        useCustomizeProfileStore.persist.clearStorage();

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

      restoreSession: async () => {
          try {
              const token = await SecureStore.getItemAsync("access_token");

              if (!token) {
                set({ isLoggedIn: false, userID: null, token: null, hydrated: true });
                return;
              }
            
              const response = await fetch(`${API_URL}/authentication/me/`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            
              if (!response.ok) {
                await SecureStore.deleteItemAsync("access_token");
                await SecureStore.deleteItemAsync("refresh_token");
                await SecureStore.deleteItemAsync("auth-storage");
              
                set({ isLoggedIn: false, userID: null, token: null, hydrated: true });
                return;
              }
              const profile = await response.json();
              set({
                isLoggedIn: true,
                token,
                userID: profile.id,
                hydrated: true,
              });
          } catch (error) {
            set({ isLoggedIn: false, userID: null, token: null, hydrated: true });
          }
        }
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