import { StyleSheet } from "react-native";
import { theme } from "./theme";

const textStyles = StyleSheet.create({
    standard: {
      fontSize: 20,
      textAlign: 'center',
      color: theme.colors.black,
    },
    small: {
      fontSize: 15,
      color: theme.colors.black,
    },
    big: {
      fontSize: 32,
      textAlign: 'center',
      fontWeight: 500,
      color: theme.colors.black,
    },
    Header: {
      alignSelf: 'center',
      fontSize: 32,
      fontWeight: 500,
      textDecorationLine: 'underline',
      color: theme.colors.black,
    },
    Label: {
      alignSelf: 'flex-start',
      fontSize: 21,
      color: theme.colors.black,
      fontWeight: 700,
      textAlign: 'left',
    },
    longForm: {
        textAlign: 'left',
        fontSize: 18,
        color: theme.colors.black,
        fontWeight: 400,
        letterSpacing: 0.2,
    },
    sectionLabel: {
        fontSize: 20,
        color: theme.colors.black,
        fontWeight: 500,
        textAlign: 'left',
    },
});

export default textStyles;