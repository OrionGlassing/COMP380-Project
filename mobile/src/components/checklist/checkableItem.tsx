import CheckBox from "./customCheckBox";
import { StyleSheet } from "react-native";
import { theme } from "@/src/constants/theme";
import { Text, View, Pressable } from "react-native";

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
                        (shouldCrossOut ? checklistStyles.checkItemTextCrossedOut : checklistStyles.checkItemTextChecked)
                        : (shouldCrossOut ? checklistStyles.checkItemTextNotCrossedOut : checklistStyles.checkItemTextNotChecked)
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
        color: theme.colors.text,
    },
    checkItemTextNotCrossedOut: {
        fontSize: 15,
        color: theme.colors.text,
    },
    checkItemTextChecked: {
        fontSize: 15,
        color: '#ffff',
        fontWeight: 500,
    },
    checkItemTextCrossedOut: {
        fontSize: 15,
        color: theme.colors.text,
        fontWeight: 500,
        textDecorationLine: 'line-through',
    },
});