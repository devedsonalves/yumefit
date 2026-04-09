import React from "react";
import { View, StyleSheet } from "react-native";
import { spacing } from "../../../shared/theme";
import { Typography } from "../../../shared/components/ui/Typography";
import { Card } from "../../../shared/components/ui/Card";

interface InputFieldProps {
  label: string;
  value: string;
}

const InputField = ({ label, value }: InputFieldProps) => (
  <Card style={styles.inputCard}>
    <Typography variant="caption">{label}</Typography>
    <Typography variant="h2" bold>
      {value}
    </Typography>
  </Card>
);

interface WorkoutInputGridProps {
  weight: string;
  reps: string;
  weightLabel: string;
  repsLabel: string;
}

export const WorkoutInputGrid = ({
  weight,
  reps,
  weightLabel,
  repsLabel,
}: WorkoutInputGridProps) => {
  return (
    <View style={styles.inputGrid}>
      <InputField label={weightLabel} value={weight} />
      <InputField label={repsLabel} value={reps} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputGrid: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  inputCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.md,
  },
});
