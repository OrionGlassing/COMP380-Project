import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CheckableItem from './checkableItem';
import { useCreateNewRecipeStore } from '@/utils/data-stores/createNewRecipeStore';
import { theme } from '@/src/constants/theme';
import textStyles from '@/src/constants/text-styles';
import checklistStyles from './checklistStyles';


const CuisineTypeCheckList = () => {

    const cuisineTypeOptions = useCreateNewRecipeStore((state) => state.cuisineTypeOptions);
    const toggleCuisineOption = useCreateNewRecipeStore((state) => state.toggleCuisineOption);

    return (
        <View style={checklistStyles.checkListContainer}>
            <Text style={textStyles.sectionLabel}>
                Select cuisine:
            </Text>
            <View style={checklistStyles.windowContainer}>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={checklistStyles.listContent}
                >
                    {cuisineTypeOptions.map(type => (
                        <CheckableItem
                            key={type.id}
                            enabled={true}
                            shouldCrossOut={false}
                            label={type.label}
                            isChecked={type.isChecked}
                            callBack={() => toggleCuisineOption(type.id)}
                        />
                    ))}
            </ScrollView>
            </View>
        </View>
    );
};

export default CuisineTypeCheckList;