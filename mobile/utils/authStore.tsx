import { create } from "zustand";   //in memory state management
import { persist, createJSONStorage } from "zustand/middleware"; //save state to device storage
import { getItem, setItem, deleteItemAsync } from "expo-secure-store";

type UserState = {
    isLoggedIn: boolean;
    logIn: () => void;
    logOut: () => void;
};

export const useAuthStore = create(         //zustand creates a store
    persist<UserState>(                     //persist saves to device storage
        (set) => ({                         //set is zustand's internal update function
            isLoggedIn: false,
            logIn: () => {
                set((state) => {
                    return {
                        ...state,           //keep the existing state
                        isLoggedIn: true,   //update only this property
                    };
                });
            },
            logOut: () => {
                set((state) => {
                    return {
                        ...state,
                        isLoggedIn: false,
                    };
                });
            },
        }),
        {                                   //define the persist config
            name: "auth-store",
            storage: createJSONStorage(() => ({ //using expo secure store functions
                setItem,
                getItem,
                removeItem: deleteItemAsync,
            })),
        },
    ),
);