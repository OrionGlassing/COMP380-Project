import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CheckableItem from './checkableItem';
import { useCustomizeProfileStore } from '@/utils/data-stores/customizeProfileStore';
import { theme } from '@/src/constants/theme';

const DietCheckList = () => {

    const dietOptions = useCustomizeProfileStore((state) => state.dietOptions);
    const toggleDiet = useCustomizeProfileStore((state) => state.toggleDiet);

    return (
        <View style={checklistStyles.checkListContainer}>
            <Text style={checklistStyles.checkListHeaderText}>
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