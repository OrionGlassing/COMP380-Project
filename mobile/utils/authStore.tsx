import { create } from "zustand";   //in memory state management
import { persist, createJSONStorage } from "zustand/middleware"; //save state to device storage
import { getItem, setItem, deleteItemAsync } from "expo-secure-store";

interface UserState {
    isLoggedIn: boolean;
    userID: string | null;
    token: string | null;
    logIn: (username: string, password: string) => Promise<void>;
    createNewAccount: (username:string, email: string, password: string) => Promise<void>;
    logOut: () => void;
};

export const useAuthStore = create(         //zustand creates a store
    persist<UserState>(                     //persist saves to device storage
        (set) => ({                         //set is zustand's internal update function
            isLoggedIn: false,
            userID: null,
            token: null,

            logIn: async (username, password) => {
                try {
                    //
                    //Backend login connection goes here.
                    //

                    set({
                        isLoggedIn: true,
                        //userID: 
                        //token: 
                    });
                } catch (error) {
                    console.error("Login failed: ", error);
                    throw error;
                }
                
            },
            createNewAccount: async (username, email, password) => {
                try {
                    //
                    //Backend create new user connection goes here.
                    //

                    set({
                        isLoggedIn: true,
                        //userID: 
                        //token: 
                    });
                } catch (error) {
                    console.error("Failed to make new account: ", error);
                    throw error;
                }
            },
            logOut: () => {
                set({
                    isLoggedIn: false,
                    userID: null,
                    token: null,
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