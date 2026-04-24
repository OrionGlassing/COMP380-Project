import React, { FC, useCallback, } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import Slider, { MarkerProps, SliderProps } from '@react-native-community/slider';
import textStyles from '@/src/constants/text-styles';
import { theme } from '@/src/constants/theme';

interface Props extends SliderProps {
    enabled: boolean;
    label: string;
    stepLabels: string[];   // e.g. ['None', 'Low', 'Medium', 'High', 'Max']
    index: number;
    callBack: (selectedValue: string, selectedIndex: number) => void;
}

const LabeledSlider = ({
    enabled,
    label,
    stepLabels,
    index,
    callBack,
    ...rest
}: Props) => {

    const StepMarker: FC<MarkerProps> = useCallback(({ stepMarked, index }) => {
        return (
            <View style={sliderStyles.stepsContainer}>
                {/* Custom string label with conditional highlighting */}
                <Text style={[
                    sliderStyles.stepLabel, 
                    stepMarked && sliderStyles.stepLabelSelected
                ]}>
                    {stepLabels[index] ?? index.toString()}
                </Text>
            </View>
        );
    }, [stepLabels]);

    return (
        <View style={sliderStyles.container}>
            <Text style={[textStyles.sectionLabel, {marginBottom: 10}]}>{label}</Text> 
            <Slider
                disabled={!enabled} 
                minimumValue={0}
                maximumValue={stepLabels.length - 1} 
                value={index} 
                step={1}
                tapToSeek={true}
                renderStepNumber={false} 
                StepMarker={StepMarker}    // use custom marker
                onSlidingComplete={(index) => {
                    const selectedValue = stepLabels[index] ?? index.toString();
                    callBack(selectedValue, index);
                }} 
                style={sliderStyles.slider}
                maximumTrackTintColor={theme.colors.grey_dark}
                minimumTrackTintColor={theme.colors.blue}
                thumbTintColor={theme.colors.blue}
            />
        </View>
    );
};

export default LabeledSlider;

const sliderStyles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flexDirection: 'column',
    },
    stepsContainer: {
        alignItems: 'center',
        marginTop: 20, 
    },
    slider: {
        opacity: 1,
        marginHorizontal: 0,
        marginBottom: 25,
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
        fontSize: 13,
        textAlign: 'center',
        color: theme.colors.black, 
    },
    stepLabelSelected: {
        marginTop: 4,
        fontSize: 13,
        textAlign: 'center',
        color: theme.colors.blue, 
        fontWeight: 'bold',
    },
});