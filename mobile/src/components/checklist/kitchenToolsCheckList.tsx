import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CheckableItem from './checkableItem';
import { useCustomizeProfileStore } from '@/utils/data-stores/customizeProfileStore';
import { theme } from '@/src/constants/theme';
import textStyles from '@/src/constants/text-styles';
import checklistStyles from './checklistStyles';


const KitchenToolsCheckList = () => {

    const kitchenTools = useCustomizeProfileStore((state) => state.kitchenTools);
    const toggleKitchenTool = useCustomizeProfileStore((state) => state.toggleKitchenTool);

    return (
        <View style={checklistStyles.checkListContainer}>
            <Text style={textStyles.sectionLabel}>
                Select your kitchen tools:
            </Text>
            <View style={checklistStyles.windowContainer}>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={checklistStyles.listContent}
                >
                    {kitchenTools.map(tool => (
                        <CheckableItem
                            key={tool.id}
                            enabled={true}
                            shouldCrossOut={false}
                            label={tool.label}
                            isChecked={tool.isChecked}
                            callBack={() => toggleKitchenTool(tool.id)}
                        />
                    ))}
            </ScrollView>
            </View>
        </View>
    );
};

export default KitchenToolsCheckList;