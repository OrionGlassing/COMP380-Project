import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CheckableItem from './checkableItem';
import { useCustomizeProfileStore } from '@/utils/data-stores/customizeProfileStore';
import { theme } from '@/src/constants/theme';
import textStyles from '@/src/constants/text-styles';
import checklistStyles from './checklistStyles';

const DietCheckList = () => {

    const dietOptions = useCustomizeProfileStore((state) => state.dietOptions);
    const toggleDiet = useCustomizeProfileStore((state) => state.toggleDiet);

    return (
        <View style={checklistStyles.checkListContainer}>
            <Text style={textStyles.sectionLabel}>
                Select your diet(s):
            </Text>
            <View style={checklistStyles.windowContainer}>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={checklistStyles.listContent}
                >
                    {dietOptions.map(diet => (
                        <CheckableItem
                            key={diet.id}
                            enabled={true}
                            shouldCrossOut={false}
                            label={diet.label}
                            isChecked={diet.isChecked}
                            callBack={() => toggleDiet(diet.id)}
                        />
                    ))}
            </ScrollView>
            </View>
        </View>
    );
};

export default DietCheckList;