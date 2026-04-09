import React from "react";
import { StyleSheet } from "react-native";
import { Typography } from "../../../shared/components/ui/Typography";
import { Card } from "../../../shared/components/ui/Card";

interface ExerciseStatCardProps {
  label: string;
  value: string;
  trend: string;
}

export const ExerciseStatCard = ({
  label,
  value,
  trend,
}: ExerciseStatCardProps) => {
  return (
    <Card style={styles.flexCard}>
      <Typography variant="caption" color="textMuted">
        {label}
      </Typography>
      <Typography variant="h3" bold>
        {value}
      </Typography>
      <Typography variant="label" color="primary">
        {trend}
      </Typography>
    </Card>
  );
};

const styles = StyleSheet.create({
  flexCard: { flex: 1 },
});
