import { router } from "expo-router";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";
import { useAuthStore } from "@/utils/authStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Arrow from "@/src/components/ui/Arrow";
import PageHeader from "@/src/components/ui/PageHeader";

export default function Account() {
  //data
  const logOut = useAuthStore((state) => state.logOut);
  //ui
  const insets = useSafeAreaInsets();

  return (
      <View style={styles.screen}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} >

        <PageHeader 
          logoText="User Profile"
          backButtonEnabled={true}
          profileButtonEnabled={false}
        />

        <View style={[styles.contentContainer, {paddingBottom: insets.bottom}]} >

        <Text style={textStyles.standard}>
          Welcome to /app/account, here the user can manage their account.
        </Text>
        <SimpleButton
          label="Customize Profile"
          onPress={() => {
            router.push("/customize-profile");
          }}
        />
        <SimpleButton
          label="Sign Out"
          onPress={() => {
            logOut();
            router.replace("/");
          }}
        />

        </View>
        
      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "#1f1f1f",
    },
    contentContainer: {
      flex: 1,
      flexDirection: "column",
      gap: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: '5%',
    },
});
