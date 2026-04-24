import CheckBox from "./customCheckBox";
import { StyleSheet } from "react-native";
import { theme } from "@/src/constants/theme";
import { Text, View, Pressable } from "react-native";
import textStyles from "@/src/constants/text-styles";

interface Props {
    enabled: boolean;
    shouldCrossOut: boolean;
    label: string;
    isChecked: boolean;
    callBack: () => void;
}


const CheckableItem = ({enabled, shouldCrossOut, label, isChecked, callBack, }: Props) => {

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
                    />
                </View>
                <Text
                    style={isChecked ?
                        (shouldCrossOut ? [textStyles.longForm, {textDecorationLine: 'line-through', color: theme.colors.grey_dark}] : checklistStyles.checkItemTextChecked)
                        : (shouldCrossOut ? textStyles.longForm : checklistStyles.checkItemTextNotChecked)
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
        color: theme.colors.black,
    },
    checkItemTextChecked: {
        fontSize: 16,
        color: theme.colors.blue,
        fontWeight: 500,
    },
});