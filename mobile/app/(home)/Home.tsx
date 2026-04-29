import AccountBtn from "@/src/components/ui/AccountBtn";
import Button from "@/src/components/ui/Button";
import Icon from "@/src/components/ui/Icon";
import Logo from "@/src/components/ui/Logo";
import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";
import { router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";

export default function Home() {
  //ui
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[
        theme.container.scrollview,
        { backgroundColor: theme.colors.background },
      ]}
      bounces={false}
    >
      <View
        style={[
          theme.container.component,
          { gap: 10, paddingBottom: 20, paddingTop: 40 },
        ]}
      >
        <Logo />
        <AccountBtn onPress={() => router.push("/account")} />
      </View>

      {/* Explore Card */}
      <View
        style={[
          theme.container.card,
          {
            backgroundColor: theme.colors.card,
            borderRadius: theme.borderRadius.md,
            overflow: "hidden",
          },
        ]}
      >
        <View
          style={{ borderRadius: theme.borderRadius.sm, overflow: "hidden" }}
        >
          <Image
            source={require("@/assets/cards/Variety-Food-Image.png")}
            style={theme.image}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon name="search-outline" color="white" size={18} />
          <Text style={textstyles.subHeader}>Explore</Text>
        </View>
        <Button
          label="Browse Recipes"
          onPress={() => router.push("/explore")}
          style={{ alignSelf: "stretch" }}
        />
      </View>

      {/* Cookbook Card */}
      <View
        style={[
          theme.container.card,
          {
            backgroundColor: theme.colors.card,
            borderRadius: theme.borderRadius.md,
            overflow: "hidden",
          },
        ]}
      >
        <View
          style={{ borderRadius: theme.borderRadius.sm, overflow: "hidden" }}
        >
          <Image
            source={require("@/assets/cards/Recipe-Book-Image.png")}
            style={theme.image}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon name="bookmark-outline" color="white" size={18} />
          <Text style={textstyles.subHeader}>My Cookbook</Text>
        </View>
        <Button
          label="My Cookbook"
          onPress={() => router.push("/cookbook")}
          style={{ alignSelf: "stretch" }}
        />
      </View>

      {/* New Recipe Card */}
      <View
        style={[
          theme.container.card,
          {
            backgroundColor: theme.colors.card,
            borderRadius: theme.borderRadius.md,
            overflow: "hidden",
          },
        ]}
      >
        <View
          style={{ borderRadius: theme.borderRadius.sm, overflow: "hidden" }}
        >
          <Image
            source={require("@/assets/cards/Cooking-Image.png")}
            style={theme.image}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Icon name="add-circle-outline" color="white" size={18} />
          <Text style={textstyles.subHeader}>New Recipe</Text>
        </View>
        <Button
          label="New Recipe"
          onPress={() => router.push("/create-new-recipe")}
          style={{ alignSelf: "stretch" }}
        />
      </View>
    </ScrollView>
  );
}
