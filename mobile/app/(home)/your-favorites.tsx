import PageHeader from "@/src/components/ui/PageHeader";
import { theme } from "@/src/constants/theme";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function YourFavorites() {
  //ui
  const insets = useSafeAreaInsets();

  return (
    <View style={theme.container.page}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <PageHeader
          logoText="My Favorites"
          backButtonEnabled={true}
          profileButtonEnabled={true}
        />

        <View
          style={[
            theme.container.content,
            { paddingBottom: insets.bottom, flex: 1, paddingTop: "5%" },
          ]}
        ></View>
      </ScrollView>
    </View>
  );
}
