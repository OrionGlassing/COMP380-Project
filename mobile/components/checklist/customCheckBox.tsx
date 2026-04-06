import { Checkbox } from 'expo-checkbox'
import checklistStyles from '@/constants/checklist-styles';
import { theme } from '@/constants/theme';


interface Props {
    enabled: boolean;
    isChecked: boolean;
}

const CheckBox = ({enabled, isChecked, }: Props) => {

    return (
        <Checkbox
            style={checklistStyles.checkBox}
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