import UserProfileForm from "@/src/components/Login/UserProfileForm";
import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard} from "react-native";
import PageHeader from "@/src/components/ui/PageHeader";

export default function UserProfile() {
  return (
    <SafeAreaView >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView contentContainerStyle={theme.container.page}>
            <PageHeader logoText={"CoKitchen"} backButtonEnabled={true} profileButtonEnabled={true}/>
            <View style={[theme.container.content, {marginVertical:16, alignSelf: "flex-start",}]}>
              <Text style={textstyles.header}>Your Profile</Text>
              <Text style={textstyles.subHeader}>Help us personalize your experience</Text>
            </View>
            <UserProfileForm />
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
