import React, { FC, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider, { MarkerProps, SliderProps } from "@react-native-community/slider";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";

interface Props extends SliderProps {
  enabled: boolean;
  label: string;
  stepLabels: string[];
  index: number;
  callBack: (selectedValue: string, selectedIndex: number) => void;
}

const LabeledSlider = ({ enabled, label, stepLabels, index, callBack, ...rest }: Props) => {
  const StepMarker: FC<MarkerProps> = useCallback(
    ({ stepMarked, index }) => (
      <View style={styles.stepsContainer}>
        <Text style={[styles.stepLabel, stepMarked && styles.stepLabelSelected]}>
          {stepLabels[index] ?? index.toString()}
        </Text>
      </View>
    ),
    [stepLabels]
  );

  return (
    <View style={styles.container}>
      <Text style={textstyles.subHeader}>{label}</Text>
      <Slider
        disabled={!enabled}
        minimumValue={0}
        maximumValue={stepLabels.length - 1}
        value={index}
        step={1}
        tapToSeek
        renderStepNumber={false}
        StepMarker={StepMarker}
        onSlidingComplete={(i) => callBack(stepLabels[i] ?? i.toString(), i)}
        style={styles.slider}
        maximumTrackTintColor={theme.colors.border}
        minimumTrackTintColor={theme.colors.primary}
        thumbTintColor={theme.colors.primary}
      />
    </View>
  );
};

export default LabeledSlider;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
  stepsContainer: {
    alignItems: "center",
    marginTop: theme.spacing.md,
  },
  slider: {
    opacity: 1,
    marginHorizontal: 0,
    marginBottom: theme.spacing.lg,
  },
  stepLabel: {
    marginTop: theme.spacing.xs,
    fontSize: 12,
    textAlign: "center",
    color: theme.colors.text,
  },
  stepLabelSelected: {
    marginTop: theme.spacing.xs,
    fontSize: 12,
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});