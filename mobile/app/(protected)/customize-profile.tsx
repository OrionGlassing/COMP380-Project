import { useState } from 'react';
import { router } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../../constants/text-styles";
import SimpleButton from "@/components/simpleButton";
import LabeledSlider from "@/components/sliders/LabeledSlider";
import { useCustomizeProfileStore } from "@/utils/data-stores/customizeProfileStore";
import DietCheckList from "@/components/checklist/dietCheckList";
import CustomTextInput from "@/components/textbox/TextBox";

export default function CustomizeProfile() {
  //Import customize profile store data (one-by-one for efficient rendering)
  const difficultyIndex = useCustomizeProfileStore((state) => state.difficultyIndex);
  const setDifficulty = useCustomizeProfileStore((state) => state.setDifficulty);

  const [textString, setTextString] = useState("");


  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f1f1f"
      }}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/customize-profile, here the user can edit profile settings.
      </Text>
      <LabeledSlider
          enabled={true}
          label="Difficulty:"
          stepLabels={['None', 'Low', 'Medium', 'High', 'Max']}
          index={difficultyIndex}
          callBack={(selectedValue: string, index: number) => {
            setDifficulty(selectedValue, index)
          }}
      />
      <DietCheckList />
      <CustomTextInput
        value={textString}
        onChangeText={(s) => {
          console.log(s);
          setTextString(s)}}
        variant="multiline-auto"
        placeholder="Example text entry box..."
        keyboardType='default'
      />
      <SimpleButton
        label="Save and Exit"
        onPress={() => {
          router.dismissTo("/account");
        }}
      />
    </View>
  );
}