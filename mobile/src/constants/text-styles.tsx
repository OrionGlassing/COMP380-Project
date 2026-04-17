import { StyleSheet } from "react-native";

const textStyles = StyleSheet.create({
    standard: {
        fontSize: 20,
        textAlign: 'center',
        color: "#ffff",
    },
    Header: {
      alignSelf: 'center',
      fontSize: 32,
      fontWeight: 500,
      textDecorationLine: 'underline',
      color: "#ffff",
    },
    Label: {
      alignSelf: 'flex-start',
      fontSize: 21,
      color: '#ffff',
      fontWeight: 700,
      textAlign: 'left',
    },
    longForm: {
        textAlign: 'left',
        fontSize: 18,
        color: "#ffff",
    }
});

export default textStyles;