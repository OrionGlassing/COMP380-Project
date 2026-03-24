import { View, Text, StyleSheet } from "react-native";

export default function Logo(){
    return <View style={styles.container}>
        <Text>Logo</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0A0908",
    }
});