import { create } from "zustand" //in memory state management
import { persist, createJSONStorage } from "zustand/middleware" //save state to device storage
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CustomizeProfileState {
    //Difficuly Slider
    difficultyValue: string;
    difficultyIndex: number;
    setDifficulty: (value: string, index: number) => void;
  
};

export const useCustomizeProfileStore = create(     //zustand creates a store
    persist<CustomizeProfileState>(                 //persist saves to device storage
        (set) => ({                                 //set is zustand's internal update function
            //Difficulty Slider
            difficultyValue: '',    //Default values will be read from database
            difficultyIndex: 0,
            setDifficulty: (value, index) => set({
                difficultyValue: value,
                difficultyIndex: index,
            })
        }),
        {                                           //define the persist config
            name: "customize-profile-storage", 
            storage: createJSONStorage(() => AsyncStorage), //Using async storage (not encrypted, faster)
        }
    )
);