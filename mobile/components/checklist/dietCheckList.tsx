import React from 'react';
import { View, FlatList, Text } from 'react-native';
import CheckableItem from './checkableItem';
import checklistStyles from '@/constants/checklist-styles';
import { useCustomizeProfileStore } from '@/utils/data-stores/customizeProfileStore';

const DietCheckList = () => {
    const dietList_Example = useCustomizeProfileStore((state) => state.dietList_Example);
    const setDietList_Example = useCustomizeProfileStore((state) => state.setDietList_Example);

    const data = [
        {
            id: 'example',
            label: 'Example List Entry',
            value: dietList_Example,
            isEnabled: true,
            setter: setDietList_Example
        },
        
    ];

    return (
        <View style={checklistStyles.checkListContainer}>
            <Text style={checklistStyles.checkListHeaderText}>
                Select your diet(s):
            </Text>
           <View style={checklistStyles.windowContainer}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                contentContainerStyle={checklistStyles.listContent}
                renderItem={({ item }) => (
                    <CheckableItem
                        enabled={item.isEnabled}
                        label={item.label}
                        isChecked={item.value}
                        callBack={(newValue) => item.setter(newValue)}
                    />
                )}
            />
        </View> 
        </View>
    );
};

export default DietCheckList;