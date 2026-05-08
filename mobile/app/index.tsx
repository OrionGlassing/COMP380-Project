//import Welcome from "@/app/(login)/Welcome";
import { useAuthStore } from "@/utils/authStore";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { LogBox } from 'react-native';

//LogBox.ignoreAllLogs(); //UNCOMMENT THIS WHEN WE ARE READY TO PRESENT! (Disables all on screen and pop up errors)

//This redirect version of the auth flow has been set up by Cesar
//This works for now but might need to be changed later...

export default function Index() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hasCompletedTutorial = useAuthStore((state) => state.hasCompletedTutorial);

  return <Redirect href={isLoggedIn ?
    (hasCompletedTutorial ? "/Home" : "/customize-profile")
    : "/Login"}
    />;
}
