import React, { FC, useState, useCallback, } from 'react';
import { View, Text, } from 'react-native';
import Slider, { MarkerProps } from '@react-native-community/slider';
import sliderStyles from '@/constants/slider-styles';

interface Props {
    enabled: boolean;
    label: string;
    stepLabels: string[];   // e.g. ['None', 'Low', 'Medium', 'High', 'Max']
    index: number;
    callBack: (selectedValue: string, selectedIndex: number) => void;
}

const LabeledSlider = ({ enabled, label, stepLabels, index, callBack }: Props) => {

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
            <Text style={sliderStyles.textLabel}>{label}</Text>
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
                maximumTrackTintColor='#ffffff'
                minimumTrackTintColor='#007AFF'
                thumbTintColor='#007AFF'
            />
        </View>
    );
};

export default LabeledSlider;