import { StyleSheet } from "react-native";

const sliderStyles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flexDirection: 'column',
        paddingHorizontal: '5%',
    },
    stepsContainer: {
        alignItems: 'center',
        marginTop: 20, 
    },
    slider: {
        opacity: 1,
        marginHorizontal: 0,
        marginBottom: 20,
    },
    textLabel: {
        fontSize: 20,
        color: '#ffff',
        fontWeight: 500,
        textAlign: 'left',
        marginBottom: 10,
    },
    stepLabel: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
        color: '#8e8e93', 
    },
    stepLabelSelected: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
        color: '#007AFF', 
        fontWeight: 'bold',
    },
});

export default sliderStyles;