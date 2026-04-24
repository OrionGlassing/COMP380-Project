import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CheckableItem from './checkableItem';
import { useCreateNewRecipeStore } from '@/utils/data-stores/createNewRecipeStore';
import { theme } from '@/src/constants/theme';
import textStyles from '@/src/constants/text-styles';
import checklistStyles from './checklistStyles';


const RecipeTypeCheckList = () => {

    const recipeTypeOptions = useCreateNewRecipeStore((state) => state.recipeTypeOptions);
    const toggleRecipeOption = useCreateNewRecipeStore((state) => state.toggleRecipeOption);

    return (
        <View style={checklistStyles.checkListContainer}>
            <Text style={textStyles.sectionLabel}>
                Select recipe type:
            </Text>
            <View style={checklistStyles.windowContainer}>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={checklistStyles.listContent}
                >
                    {recipeTypeOptions.map(type => (
                        <CheckableItem
                            key={type.id}
                            enabled={true}
                            shouldCrossOut={false}
                            label={type.label}
                            isChecked={type.isChecked}
                            callBack={() => toggleRecipeOption(type.id)}
                        />
                    ))}
            </ScrollView>
            </View>
        </View>
    );
};

export default RecipeTypeCheckList;
