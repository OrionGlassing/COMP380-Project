import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CheckableItem from './checkableItem';
import { useCreateNewRecipeStore } from '@/utils/data-stores/createNewRecipeStore';
import { theme } from '@/src/constants/theme';


const RecipeTypeCheckList = () => {

    const recipeTypeOptions = useCreateNewRecipeStore((state) => state.recipeTypeOptions);
    const toggleRecipeOption = useCreateNewRecipeStore((state) => state.toggleRecipeOption);

    return (
        <View style={checklistStyles.checkListContainer}>
            <Text style={checklistStyles.checkListHeaderText}>
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

const checklistStyles = StyleSheet.create({
    checkListContainer: {
        alignSelf: 'stretch',
        flexDirection: 'column',
        gap: 10,
    },
    windowContainer: {
        alignSelf: 'center',
        height: 200, 
        width: '100%',
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#444',
        overflow: 'hidden', 
    },
    listContent: {
        paddingBottom: 20, 
    },
    checkListHeaderText: {
        fontSize: 20,
        color: '#ffff',
        fontWeight: 500,
        textAlign: 'left',
    },
});