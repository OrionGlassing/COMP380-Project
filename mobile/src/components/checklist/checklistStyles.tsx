import { StyleSheet } from "react-native";
import { theme } from "@/src/constants/theme";

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
        backgroundColor: theme.colors.yellow_bright,
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: theme.colors.black,
        overflow: 'hidden', 
    },
    listContent: {
        paddingBottom: 20, 
    },
});

export default checklistStyles;