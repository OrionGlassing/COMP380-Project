import Accordion from "@/src/components/ui/Accordion";
import Arrow from "@/src/components/ui/Arrow";
import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";
import { router } from "expo-router";
import { View, Text, ScrollView } from "react-native";

export default function Help() {
  return (
    <ScrollView style={theme.container.scrollview}>
      <Arrow
        type={"arrow-back"}
        onPress={() => router.back()}
        style={{ gap: 10, paddingBottom: 20, paddingTop: 20 }}
      />
      <View
        style={[
          theme.container.component,
          { flexDirection: "column" },
          { gap: 10, paddingBottom: 20 },
        ]}
      >
        <Accordion title="Getting Started">
          <Text style={textstyles.body}>
            Welcome to CoKitchen! Start by creating an account or logging in.
            Once in, you can explore recipes, save favorites to your cookbook,
            and use our AI chat to generate custom recipes based on ingredients
            you have and your personal customization.
          </Text>
        </Accordion>

        <Accordion title="Recipes">
          <Text style={textstyles.body}>
            Browse recipes by category or use the search bar to find something
            specific. Tap a recipe to view ingredients, steps, and serving
            sizes. You can save any recipe directly to your cookbook for easy
            access later.
          </Text>
        </Accordion>

        <Accordion title="My Cookbook">
          <Text style={textstyles.body}>
            Your cookbook is your personal collection of saved recipes. Tap the
            bookmark icon on any recipe to add it. You can organize and revisit
            your saved recipes anytime from the Cookbook tab.
          </Text>
        </Accordion>

        <Accordion title="Account">
          <Text style={textstyles.body}>
            Manage your profile, change your password, or update your
            preferences from the Account settings. To delete your account,
            contact us at support@cokitchen.com.
          </Text>
        </Accordion>

        <Accordion title="FAQ">
          <Text style={textstyles.body}>
            Q: Is CoKitchen free?{"\n"}A: Yes, CoKitchen is free to use.{"\n\n"}
            Q: Can I use it offline?{"\n"}A: An internet connection is required
            for AI features and recipe loading.
          </Text>
        </Accordion>

        <Accordion title="Feedback">
          <Text style={textstyles.body}>
            We'd love to hear from you! If you have suggestions, found a bug, or
            just want to share your experience, reach out to us at
            feedback@cokitchen.com. Your input helps us improve.
          </Text>
        </Accordion>

        <Accordion title="About">
          <Text style={textstyles.body}>
            CoKitchen is a recipe app built by a team of students as part of
            COMP380. Our goal is to make cooking more accessible and fun through
            AI-powered recipe generation and personalization.
          </Text>
        </Accordion>
      </View>
    </ScrollView>
  );
}
