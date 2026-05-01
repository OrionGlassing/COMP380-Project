import Arrow from "@/src/components/ui/Arrow";
import Logo from "@/src/components/ui/Logo";
import SearchBar from "@/src/components/home/SearchBar";
import Filter from "@/src/components/ui/Filter";
import RecipeCard from "@/src/components/recipe-cards/recipeCard";
import { router } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";

export default function Explore() {
  //ui
  //const insets = useSafeAreaInsets();

  return (
    <ScrollView style={theme.container.scrollview}>
      {/* Header */}
      <View style={[theme.container.component, { paddingTop: 40 }]}>
        <Arrow type="arrow-back" onPress={() => router.back()} />
        <Logo style={{ flex: 1 }} />
      </View>

      {/* Search + Filter */}
      <View style={theme.container.component}>
        <SearchBar />
        <Filter />
      </View>

      {/* New Picks */}
      <View style={{ gap: theme.spacing.sm, padding: theme.spacing.sm }}>
        <View
          style={[
            theme.container.subcomponent,
            { backgroundColor: theme.colors.component },
            { borderRadius: theme.borderRadius.lg },
          ]}
        >
          <Text style={[textstyles.subHeader, { color: "white" }]}>
            New Picks
          </Text>
          <Arrow
            type="arrow-forward"
            onPress={() => router.push("/(home)/new-picks")}
            style={{ margin: 0, padding: 0 }}
          />{" "}
        </View>
        <RecipeCard ID="5" />
      </View>

      {/* Popular Right Now */}
      <View style={{ gap: theme.spacing.sm, padding: theme.spacing.sm }}>
        <View
          style={[
            theme.container.subcomponent,
            { backgroundColor: theme.colors.component },
            { borderRadius: theme.borderRadius.lg },
          ]}
        >
          <Text style={[textstyles.subHeader, { color: "white" }]}>
            Popular Right Now
          </Text>
          <Arrow
            type="arrow-forward"
            onPress={() => router.push("/(home)/popular-right-now")}
            style={{ margin: 0, padding: 0 }}
          />
        </View>
        <Text style={textstyles.body}>Display cards</Text>
      </View>

      {/* Your Favorites */}
      <View style={{ gap: theme.spacing.sm, padding: theme.spacing.sm }}>
        <View
          style={[
            theme.container.subcomponent,
            { backgroundColor: theme.colors.component },
            { borderRadius: theme.borderRadius.lg },
          ]}
        >
          <Text style={[textstyles.subHeader, { color: "white" }]}>
            Your Favorites
          </Text>
          <Arrow
            type="arrow-forward"
            onPress={() => router.push("/(home)/your-favorites")}
            style={{ margin: 0, padding: 0 }}
          />
        </View>
        <Text style={textstyles.body}>Display cards</Text>
      </View>
    </ScrollView>
  );
}
