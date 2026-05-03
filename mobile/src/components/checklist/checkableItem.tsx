import CheckBox from "./customCheckBox";
import { StyleSheet } from "react-native";
import { theme } from "@/src/constants/theme";
import { Text, View, Pressable } from "react-native";
import textstyles from "@/src/constants/textstyles";

interface Props {
    enabled: boolean;
    shouldCrossOut: boolean;
    label: string;
    isChecked: boolean;
    buttonColor: string;
    callBack: () => void;
}


const CheckableItem = ({enabled, shouldCrossOut, label, isChecked, buttonColor, callBack, }: Props) => {

    return (
        <View style={checklistStyles.checkItemContainer}>
            <Pressable
                disabled={!enabled}
                onPress={() => {
                    callBack();
                }}
                style={checklistStyles.checkItemPressable}
            >
                <View pointerEvents="none">
                    <CheckBox
                        enabled={enabled}
                        isChecked={isChecked}
                        buttonColor={buttonColor}
                    />
                </View>
                <Text
                    style={isChecked ?
                        (shouldCrossOut ? [textstyles.body, {textDecorationLine: 'line-through', color: theme.colors.textMuted}] : checklistStyles.checkItemTextChecked)
                        : (shouldCrossOut ? textstyles.body : checklistStyles.checkItemTextNotChecked)
                        }
                >
                    {label}
                </Text>
            </Pressable>
        </View>
    );
};

export default CheckableItem;

const checklistStyles = StyleSheet.create({
    checkItemContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkItemPressable: {
        flexDirection: 'row', 
        alignItems: 'center',
        alignSelf: 'flex-start', 
        gap: 10,
        
    },
    checkItemTextNotChecked: {
        fontSize: 15,
        color: theme.colors.lightinput,
    },
    checkItemTextNotCrossedOut: {
        fontSize: 15,
        color: theme.colors.lightinput,
    },
    checkItemTextChecked: {
        fontSize: 16,
        color: theme.colors.primary,
        fontWeight: 500,
    },
    checkItemTextCrossedOut: {
        fontSize: 15,
        color: theme.colors.primary,
        fontWeight: 500,
        textDecorationLine: 'line-through',
    },
});