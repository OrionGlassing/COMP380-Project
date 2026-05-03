import LoginForm from "@/src/components/Login/LoginForm";
import Divider from "@/src/components/ui/Divider";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import Button from "@/src/components/ui/Button";
import { useRouter } from "expo-router";
import { theme } from "@/src/constants/theme";
import SocialButtons from "@/src/components/Login/SocialButtons";
import PageHeader from "@/src/components/ui/PageHeader";

export default function Login() {
  const router = useRouter();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={theme.container.page}>
          <PageHeader logoText={"CoKitchen"} backButtonEnabled={false} profileButtonEnabled={false}/>
          <View style={theme.container.component}>
            <SocialButtons/>
          </View>
          <Divider />
          <LoginForm />
          <Divider />
          <Button
            label={"Create Account"}
            onPress={() => {
              router.push("/SignUp");
            }}
            style={{ width: "90%", alignSelf: "center"}}
          />
          <Divider />
          <Button label={"Help"} onPress={() => router.push("/Help")} style={{ width: "90%", alignSelf: "center"}} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
