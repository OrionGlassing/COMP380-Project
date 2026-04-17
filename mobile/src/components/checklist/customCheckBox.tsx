import { Checkbox } from 'expo-checkbox'
import { StyleSheet } from "react-native";
import { theme } from '@/src/constants/theme';


interface Props {
    enabled: boolean;
    isChecked: boolean;
}

const CheckBox = ({enabled, isChecked, }: Props) => {

    return (
        <Checkbox
            style={checkBoxStyles.checkBox}
            value={isChecked}
            color={
                    isChecked ? 
                    (enabled ? theme.colors.primary : theme.colors.grey) :
                    (enabled ? '#ffff' : theme.colors.grey)
            }
        />
    );
};

export default CheckBox;

const checkBoxStyles = StyleSheet.create({
    checkBox: {
        margin: 8,
    },
});