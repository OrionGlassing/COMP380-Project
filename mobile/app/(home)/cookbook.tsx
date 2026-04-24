import { router } from "expo-router";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import textStyles from "@/src/constants/text-styles";
import Arrow from "@/src/components/ui/Arrow";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PageHeader from "@/src/components/ui/PageHeader";

export default function SignUp() {
  //ui
  const insets = useSafeAreaInsets();

  return (
      <View style={styles.screen}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} >

        <PageHeader 
          logoText="My Cookbook"
          backButtonEnabled={true}
          profileButtonEnabled={true}
        />

      <View style={[styles.contentContainer, {paddingBottom: insets.bottom}]} >


      </View>
      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "#F0EBD8",
    },
    contentContainer: {
      flex: 1,
      flexDirection: "column",
      gap: 20,
      //justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: '5%',
      paddingTop: '5%',
    },
});
