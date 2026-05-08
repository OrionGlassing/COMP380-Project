//import Welcome from "@/app/(login)/Welcome";
import { useAuthStore } from "@/utils/authStore";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";

//This redirect version of the auth flow has been set up by Cesar
//This works for now but might need to be changed later...

export default function Index() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hydrated = useAuthStore((state) => state.hydrated);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? "/(home)/Home" : "/(Login)/Login"}/>;
}
