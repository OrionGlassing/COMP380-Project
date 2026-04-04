import React from 'react';
import { StyleSheet, Text, View, Pressable, } from 'react-native';


interface Props {
    label: string;
    onPress: () => void;
}

const SimpleButton = ({ label, onPress, }: Props) => {

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text 
                style={styles.text}
                numberOfLines={1}
            >
                {label}
            </Text>
        </Pressable>
    );
};

export default SimpleButton;

const styles = StyleSheet.create({
    button: {
        height: 75,
        width: 250,
        borderRadius: 10,
        paddingHorizontal: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0066ff",
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: "#ffff",
    },
});