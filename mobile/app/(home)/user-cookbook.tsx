import PageHeader from "@/src/components/ui/PageHeader";
import { theme } from "@/src/constants/theme";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RecipeCard from "@/src/components/recipe-cards/recipeCard";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import { useEffect } from "react";

const CARD_GAP = 20;
const HORIZONTAL_PADDING_PERCENT = 0.05;
const MIN_CARD_WIDTH = 160;

export default function UserCookbook() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const saved_recipes = useRecipeStore((state) => state.saved_recipes);
  const fetchSavedRecipes = useRecipeStore((state) => state.fetchSavedRecipes);

  useEffect(() => {
    fetchSavedRecipes();
  }, [fetchSavedRecipes]);

  const horizontalPadding = width * HORIZONTAL_PADDING_PERCENT;
  const availableWidth = width - horizontalPadding * 2;

  const numColumns = Math.max(
    1,
    Math.floor((availableWidth + CARD_GAP) / (MIN_CARD_WIDTH + CARD_GAP)),
  );

  const cardWidth =
    (availableWidth - CARD_GAP * (numColumns - 1)) / numColumns;

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrapper}>
        <PageHeader
          logoText="Cookbook"
          backButtonEnabled={true}
          profileButtonEnabled={true}
          transparent={false}
        />
      </View>

      <FlatList
        data={saved_recipes}
        key={numColumns}
        keyExtractor={(item) => String(item)}
        numColumns={numColumns}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: horizontalPadding,
          },
        ]}
        columnWrapperStyle={
          numColumns > 1 ? { gap: CARD_GAP, justifyContent: "flex-start" } : undefined
        }
        ItemSeparatorComponent={() => <View style={{ height: CARD_GAP }} />}
        bounces={true}
        renderItem={({ item }) => (
          <View style={{ width: cardWidth }}>
            <RecipeCard ID={item} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No saved recipes yet.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerWrapper: {
    zIndex: 10,
  },
  contentContainer: {
    paddingTop: "5%",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: 16,
  },
});