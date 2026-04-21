//import Welcome from "@/app/(login)/Welcome";
import { useAuthStore } from "@/utils/authStore";
import { Redirect } from "expo-router";

export default function Index() {
  //with my version of expo
  const {isLoggedIn} = useAuthStore();
  return <Redirect href={isLoggedIn ? "/(home)/Home" : "/(login)/Welcome"}/>;
}
