import PageHeader from "@/src/components/ui/PageHeader";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewPicks() {
  //ui
  const insets = useSafeAreaInsets();

  return (
      <View style={styles.screen}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} >

        <PageHeader 
          logoText="New Picks"
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
