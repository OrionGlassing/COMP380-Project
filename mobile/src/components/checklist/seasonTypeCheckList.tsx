import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CheckableItem from './checkableItem';
import { useCreateNewRecipeStore } from '@/utils/data-stores/createNewRecipeStore';
import { theme } from '@/src/constants/theme';
import textStyles from '@/src/constants/text-styles';
import checklistStyles from './checklistStyles';

const SeasonTypeCheckList = () => {

    const seasonTypeOptions = useCreateNewRecipeStore((state) => state.seasonTypeOptions);
    const toggleSeasonOption = useCreateNewRecipeStore((state) => state.toggleSeasonOption);

    return (
        <View style={checklistStyles.checkListContainer}>
            <Text style={textStyles.sectionLabel}>
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