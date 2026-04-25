import { router } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";
import LabeledSlider from "@/src/components/sliders/LabeledSlider";
import CustomTextInput from "@/src/components/textbox/TextBox";
import RecipeTypeCheckList from "@/src/components/checklist/recipeTypeCheckList";
import CuisineTypeCheckList from "@/src/components/checklist/cuisineTypeCheckList";
import SeasonTypeCheckList from "@/src/components/checklist/seasonTypeCheckList";
import Arrow from "@/src/components/ui/Arrow";
import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";
import Button from "@/src/components/ui/Button";

export default function CreateNewRecipe() {
  //Import customize profile store data (one-by-one for efficient rendering)
  const spiceLevelIndex = useCreateNewRecipeStore(
    (state) => state.spiceLevelIndex,
  );
  const setSpiceLevel = useCreateNewRecipeStore((state) => state.setSpiceLevel);

  const sweetnessLevelIndex = useCreateNewRecipeStore(
    (state) => state.sweetnessLevelIndex,
  );
  const setSweetnessLevel = useCreateNewRecipeStore(
    (state) => state.setSweetnessLevel,
  );

  const recipeComplexityIndex = useCreateNewRecipeStore(
    (state) => state.recipeComplexityIndex,
  );
  const setRecipeComplexity = useCreateNewRecipeStore(
    (state) => state.setRecipeComplexity,
  );

  const recipeTimeIndex = useCreateNewRecipeStore(
    (state) => state.recipeTimeIndex,
  );
  const setRecipeTime = useCreateNewRecipeStore((state) => state.setRecipeTime);

  const recipeDescription = useCreateNewRecipeStore(
    (state) => state.recipeDescription,
  );
  const setRecipeDescription = useCreateNewRecipeStore(
    (state) => state.setRecipeDescription,
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: theme.spacing.md,
          gap: theme.spacing.md,
        }}
      >
        <Arrow type={"arrow-back"} onPress={() => router.back()} />

        <Text style={textstyles.header}>General Options</Text>

        <RecipeTypeCheckList />

        <CuisineTypeCheckList />

        <SeasonTypeCheckList />

        <LabeledSlider
          enabled={true}
          label="Spice Level"
          stepLabels={["None", "Very Low", "Mild", "Spicy", "Very Spicy"]}
          index={spiceLevelIndex}
          callBack={(selectedValue: string, index: number) => {
            setSpiceLevel(selectedValue, index);
          }}
        />

        <LabeledSlider
          enabled={true}
          label="Sweetness Level"
          stepLabels={["None", "Very Low", "Some", "Sweet", "Very Sweet"]}
          index={sweetnessLevelIndex}
          callBack={(selectedValue: string, index: number) => {
            setSweetnessLevel(selectedValue, index);
          }}
        />

        <LabeledSlider
          enabled={true}
          label="Recipe Complexity"
          stepLabels={["Simple", "Average", "Involved", "Complex"]}
          index={recipeComplexityIndex}
          callBack={(selectedValue: string, index: number) => {
            setRecipeComplexity(selectedValue, index);
          }}
        />

        <LabeledSlider
          enabled={true}
          label="Time Limit"
          stepLabels={["15 min", "30 min", "45 min", "1 hr", "No Limit"]}
          index={recipeTimeIndex}
          callBack={(selectedValue: string, index: number) => {
            setRecipeTime(selectedValue, index);
          }}
        />

        <Text style={textstyles.header}>Your Hankering</Text>

        <Text style={[textstyles.body, { marginBottom: -10 }]}>
          Describe what you're in the mood for:
        </Text>
        <CustomTextInput
          value={recipeDescription}
          onChangeText={(s) => {
            setRecipeDescription(s);
          }}
          variant="multiline-fixed"
          placeholder="I'm hungry for..."
          keyboardType="default"
        />

        <Button
          label="Let's Cook!"
          onPress={() => {
            router.replace("/loading-recipe");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
