import { useRouter } from "expo-router";
import Welcome from "@/app/(auth)/Welcome";

export default function Index() {
  const router = useRouter();
  return <Welcome/>;
}
