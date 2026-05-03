import { router } from "expo-router";
import { Text, View } from "react-native";
import Arrow from "@/src/components/ui/Arrow";
import { theme } from "@/src/constants/theme";
import Divider from "@/src/components/ui/Divider";
import textstyles from "@/src/constants/textstyles";
import PageHeader from "@/src/components/ui/PageHeader";

export default function cookbook() {
  return (
    <View style={theme.container.page}>
      <View style={[theme.container.component, { paddingTop: 40 }]}>
        <Arrow type="arrow-back" onPress={() => router.back()} />
        <PageHeader logoText={"CoKitchen"} backButtonEnabled={true} profileButtonEnabled={true}/>
      </View>
      <Text style={textstyles.header}>Manage CookBook</Text>
      <Divider>My Collection</Divider>
      <Text style={textstyles.body}> Display cards and options</Text>

      <Divider>Favorites</Divider>
      <Text style={textstyles.body}>Display favorites recipe cards</Text>
      <Divider>Disliked</Divider>
      <Text style={textstyles.body}>Display disliked recipe cards</Text>
      <Divider>Recently Viewed</Divider>
      <Text style={textstyles.body}>Display recently viewed recipe cards</Text>

      <Divider>Created</Divider>
      <Text style={textstyles.body}>Display created viewed recipe cards</Text>
    </View>
  );
}
