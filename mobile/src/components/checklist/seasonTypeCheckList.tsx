import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CheckableItem from './checkableItem';
import { useCreateNewRecipeStore } from '@/utils/data-stores/createNewRecipeStore';
import { theme } from '@/src/constants/theme';


const SeasonTypeCheckList = () => {

    const seasonTypeOptions = useCreateNewRecipeStore((state) => state.seasonTypeOptions);
    const toggleSeasonOption = useCreateNewRecipeStore((state) => state.toggleSeasonOption);

    return (
        <View style={checklistStyles.checkListContainer}>
            <Text style={checklistStyles.checkListHeaderText}>
                Select a season:
            </Text>
            <View style={checklistStyles.windowContainer}>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={checklistStyles.listContent}
                >
                    {seasonTypeOptions.map(type => (
                        <CheckableItem
                            key={type.id}
                            enabled={true}
                            shouldCrossOut={false}
                            label={type.label}
                            isChecked={type.isChecked}
                            callBack={() => toggleSeasonOption(type.id)}
                        />
                    ))}
            </ScrollView>
            </View>
        </View>
    );
};

export default SeasonTypeCheckList;

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