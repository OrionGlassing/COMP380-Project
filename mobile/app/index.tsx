//import Welcome from "@/app/(login)/Welcome";
import { useAuthStore } from "@/utils/authStore";
import { Redirect } from "expo-router";

//This redirect version of the auth flow has been set up by Cesar
//This works for now but might need to be changed later...

export default function Index() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return <Redirect href={isLoggedIn ? "/Home" : "/Welcome"}/>;
}
