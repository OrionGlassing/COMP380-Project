import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '@/src/constants/theme';

interface Props extends Omit<TextInputProps, 'onChangeText'> {
    value: string;
    onChangeText: (text: string) => void;
    variant: 'single' | 'multiline-fixed' | 'multiline-auto';
    placeholder: string;
    maxCharacters?: number; //TODO: Implement maxCharacters
}

const CustomTextInput = ({ 
    value, 
    onChangeText, 
    variant, 
    placeholder, 
    maxCharacters,
    ...rest
}: Props) => {

    const isMultiline = variant === 'multiline-fixed' || variant === 'multiline-auto';

    const getVariantStyle = () => {
        switch (variant) {
            case 'multiline-fixed':
                return styles.fixedHeight;
            case 'multiline-auto':
                return styles.autoExpanding;
            case 'single':
            default:
                return styles.singleLine;
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.textInput, getVariantStyle()]}
                value={value}
                onChangeText={onChangeText}
                multiline={isMultiline}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.grey_dark}
                textAlignVertical={isMultiline ? 'top' : 'center'}
                {...rest}
            />
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    textInput: {
        backgroundColor: theme.colors.yellow_bright,
        color: '#000000',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: theme.colors.black,
        fontSize: 16,
    },
    singleLine: {
        height: 50,
    },
    fixedHeight: {
        height: 150, 
    },
    autoExpanding: {
        minHeight: 50,
        maxHeight: 150, 
    }
});