import AccountBtn from "@/src/components/ui/AccountBtn";
import Button from "@/src/components/ui/Button";
import Icon from "@/src/components/ui/Icon";
import PageHeader from "@/src/components/ui/PageHeader";
import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";
import { router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";

export default function Home() {

  return (
    <View style={[{flex: 1, }]}>
      <View style={[{zIndex: 10}]}>
        <PageHeader
          logoText={"CoKitchen"}
          backButtonEnabled={false}
          profileButtonEnabled={true}
          transparent={false}
        />
      </View>

      <ScrollView
        style={[
          theme.container.scrollview,
          { backgroundColor: theme.colors.background, },
        ]}
        bounces={true}
      >

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
            onPress={() => router.push("/discover")}
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
            onPress={() => router.push("/user-cookbook")}
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
              marginBottom: 150,
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
    </View>
  );
}