import UserProfileForm from "@/src/components/Login/UserProfileForm";
import Divider from "@/src/components/ui/Divider";
import Logo from "@/src/components/ui/Logo";
import { View, Text, StyleSheet } from "react-native";

export default function UserProfile() {
  return (
    <View style={styles.container}>
      <Logo/>
      <UserProfileForm/>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 10,
    },

});
