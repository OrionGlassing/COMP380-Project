import UserProfileForm from "@/src/components/Login/UserProfileForm";
import Logo from "@/src/components/ui/Logo";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function UserProfile() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      <View style={styles.header}>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>Help us personalize your experience</Text>
      </View>
      <UserProfileForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginVertical: 16,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D2D44",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
