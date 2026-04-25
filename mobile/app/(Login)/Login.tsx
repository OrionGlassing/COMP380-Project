import LoginForm from "@/src/components/Login/LoginForm";
import Divider from "@/src/components/ui/Divider";
import Logo from "@/src/components/ui/Logo";
import { View } from "react-native";
import Button from "@/src/components/ui/Button";
import { useRouter } from "expo-router";
import { theme } from "@/src/constants/theme";
import SocialButtons from "@/src/components/Login/SocialButtons";

export default function Login() {
  const router = useRouter();
  return (
    <View style={theme.container.page}>
      <Logo/>
      <View style={theme.container.component}>
        <SocialButtons/>
      </View>
      <Divider />
      <LoginForm />
      <Divider />
      <Button
        label={"Create Account"}
        onPress={() => {
          router.push("/signUp");
        }}
        style={{ width: "90%", alignSelf: "center"}}
      />
      <Divider />
      <Button label={"Help"} onPress={() => router.push("/help")} style={{ width: "90%", alignSelf: "center"}} />
    </View>
  );
}
