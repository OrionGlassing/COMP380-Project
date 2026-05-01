import { Checkbox } from "expo-checkbox";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { theme } from "@/src/constants/theme";

interface Props {
  enabled: boolean;
  isChecked: boolean;
}

const CheckBox = ({ enabled, isChecked }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Checkbox
              style={checkBoxStyles.checkBox}
              value={isChecked}
              color={
                isChecked
                  ? enabled
                    ? theme.colors.primary
                    : theme.colors.textMuted
                  : enabled
                    ? "#ffff"
                    : theme.colors.textMuted
              }
            />
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CheckBox;

const checkBoxStyles = StyleSheet.create({
  checkBox: {
    margin: 8,
  },
});
