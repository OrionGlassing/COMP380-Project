import { router } from "expo-router";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";
import LabeledSlider from "@/src/components/sliders/LabeledSlider";
import CustomTextInput from "@/src/components/textbox/TextBox";
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";
import RecipeTypeCheckList from "@/src/components/checklist/recipeTypeCheckList";
import CuisineTypeCheckList from "@/src/components/checklist/cuisineTypeCheckList";
import SeasonTypeCheckList from "@/src/components/checklist/seasonTypeCheckList";
import Arrow from "@/src/components/ui/Arrow";
import PageHeader from "@/src/components/ui/PageHeader";

export default function CreateNewRecipe() {

  //Import customize profile store data (one-by-one for efficient rendering)
    const spiceLevelIndex = useCreateNewRecipeStore((state) => state.spiceLevelIndex);
    const setSpiceLevel = useCreateNewRecipeStore((state) => state.setSpiceLevel);

    const sweetnessLevelIndex = useCreateNewRecipeStore((state) => state.sweetnessLevelIndex);
    const setSweetnessLevel = useCreateNewRecipeStore((state) => state.setSweetnessLevel);

    const recipeComplexityIndex = useCreateNewRecipeStore((state) => state.recipeComplexityIndex);
    const setRecipeComplexity = useCreateNewRecipeStore((state) => state.setRecipeComplexity);

    const recipeTimeIndex = useCreateNewRecipeStore((state) => state.recipeTimeIndex);
    const setRecipeTime = useCreateNewRecipeStore((state) => state.setRecipeTime);

    const recipeDescription = useCreateNewRecipeStore((state) => state.recipeDescription);
    const setRecipeDescription = useCreateNewRecipeStore((state) => state.setRecipeDescription);

  //ui
    const insets = useSafeAreaInsets();

  return (
      <View style={styles.screen}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} >

        <PageHeader 
          logoText="New Recipe"
          backButtonEnabled={true}
          profileButtonEnabled={true}
        />

      <View style={[styles.contentContainer, {paddingBottom: insets.bottom}]} >

      <Text style={textStyles.Header}>
        General Options
      </Text>

      <RecipeTypeCheckList />

      <CuisineTypeCheckList />

      <SeasonTypeCheckList />

      <LabeledSlider
          enabled={true}
          label="Spice Level"
          stepLabels={['None', 'Very Low', 'Mild', 'Spicy', 'Very Spicy']}
          index={spiceLevelIndex}
          callBack={(selectedValue: string, index: number) => {
            setSpiceLevel(selectedValue, index)
          }}
      />

      <LabeledSlider
          enabled={true}
          label="Sweetness Level"
          stepLabels={['None', 'Very Low', 'Some', 'Sweet', 'Very Sweet']}
          index={sweetnessLevelIndex}
          callBack={(selectedValue: string, index: number) => {
            setSweetnessLevel(selectedValue, index)
          }}
      />

      <LabeledSlider
          enabled={true}
          label="Recipe Complexity"
          stepLabels={['Simple', 'Average', 'Involved', 'Complex']}
          index={recipeComplexityIndex}
          callBack={(selectedValue: string, index: number) => {
            setRecipeComplexity(selectedValue, index)
          }}
      />

      <LabeledSlider
          enabled={true}
          label="Time Limit"
          stepLabels={['15 min', '30 min', '45 min', '1 hr', 'No Limit']}
          index={recipeTimeIndex}
          callBack={(selectedValue: string, index: number) => {
            setRecipeTime(selectedValue, index)
          }}
      />

      <Text style={textStyles.Header}>
        Your Hankering
      </Text>

      <Text style={[textStyles.Label, {marginBottom: -10}]}>
        Describe what you're in the mood for:
      </Text>
      <CustomTextInput
        value={recipeDescription}
        onChangeText={(s) => {setRecipeDescription(s)}}
        variant="multiline-fixed"
        placeholder="I'm hungry for..."
        keyboardType='default'
      />

      <SimpleButton
        label="Let's Cook!"
        onPress={() => {
          router.replace("/loading-recipe");
        }}
      />

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