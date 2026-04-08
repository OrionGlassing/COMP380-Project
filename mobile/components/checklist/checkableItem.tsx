import CheckBox from "./customCheckBox";
import { StyleSheet } from "react-native";
import { theme } from "@/constants/theme";
import { Text, View, Pressable } from "react-native";

interface Props {
    enabled: boolean;
    label: string;
    isChecked: boolean;
    callBack: (val: boolean) => void;
}


const CheckableItem = ({enabled, label, isChecked, callBack, }: Props) => {

    return (
        <View style={checklistStyles.checkItemContainer}>
            <Pressable
                disabled={!enabled}
                onPress={() => {
                    callBack(!isChecked);
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
                    style={isChecked ? checklistStyles.checkItemTextChecked : checklistStyles.checkItemTextNotChecked}
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
        color: theme.colors.grey,
    },
    checkItemTextChecked: {
        fontSize: 15,
        color: '#ffff',
        fontWeight: 500,
    },
});