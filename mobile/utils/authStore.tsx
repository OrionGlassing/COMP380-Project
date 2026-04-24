import { create } from "zustand";   //in memory state management
import { persist, createJSONStorage } from "zustand/middleware"; //save state to device storage
import { getItem, setItem, deleteItemAsync } from "expo-secure-store";

interface UserState {
    hydrated: boolean;                  //Frontend only (prevents that app from briefly routing to the wrong page)
    isLoggedIn: boolean;                //Frontend only (manages routing to app or login pages)
    hasCompletedTutorial: boolean;      //Frontend only (manages routing to app or tutorial flow)
    userID: string | null;              //Users account ID to locate them in the database (backend)
    token: string | null;               //Ticket for backend/database requests (backend)
    setHydrated: (value: boolean) => void;
    logIn: (username: string, password: string) => Promise<void>;
    createNewAccount: (username:string, email: string, password: string) => Promise<void>;
    logOut: () => void;
    completeTutorial: () => void;
};

export const useAuthStore = create(         //zustand creates a store
    persist<UserState>(                     //persist saves to device storage
        (set) => ({                         //set is zustand's internal update function
            hydrated: false,
            isLoggedIn: false,
            hasCompletedTutorial: false,
            userID: null,
            token: null,

            setHydrated(value) {
                set({
                    hydrated: value,
                });
            },

            logIn: async (username, password) => {
                try {

                    //
                    //Backend login operation goes here.
                    //

                    set({
                        isLoggedIn: true,
                        hasCompletedTutorial: true,
                        //userID: 
                        //token: 
                    });
                } catch (error) {
                    console.error("Login failed: ", error);
                    throw error;
                }
            },
            
            createNewAccount: async (username, email, password) => {
                //The backend should give a specific reason if making a new account fails
                //So that we can tell the user what went wrong
                    //Ex: Username taken, email already exists, etc.

                try {

                    //
                    //Backend create new user operation goes here.
                    //

                    set({
                        isLoggedIn: true,
                        hasCompletedTutorial: false,
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

            completeTutorial: () => {
                set({
                    hasCompletedTutorial: true,
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
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        },
    ),
);