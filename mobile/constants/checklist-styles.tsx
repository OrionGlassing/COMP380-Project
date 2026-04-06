import { StyleSheet } from "react-native";
import { theme } from "./theme";

const checklistStyles = StyleSheet.create({
    checkBox: {
        margin: 8,
    },
    checkItemContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkItemPressable: {
        flexDirection: 'row', 
        alignItems: 'center',
        alignSelf: 'flex-start', 
        gap: 10,
    },
    checkItemTextNotChecked: {
        fontSize: 15,
        color: theme.colors.grey,
    },
    checkItemTextChecked: {
        fontSize: 15,
        color: '#ffff',
        fontWeight: 500,
    },
    checkListContainer: {
        alignSelf: 'stretch',
        flexDirection: 'column',
        paddingHorizontal: '5%',
        gap: 10,
    },
    windowContainer: {
        alignSelf: 'center',
        height: 250, 
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

export default checklistStyles;