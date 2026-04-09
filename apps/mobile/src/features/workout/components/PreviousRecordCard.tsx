import React from "react";
import { StyleSheet } from "react-native";
import { spacing } from "../../../shared/theme";
import { Typography } from "../../../shared/components/ui/Typography";
import { Card } from "../../../shared/components/ui/Card";

interface PreviousRecordCardProps {
  label: string;
  value: string;
}

export const PreviousRecordCard = ({
  label,
  value,
}: PreviousRecordCardProps) => {
  return (
    <Card style={styles.previousCard} variant="outline">
      <Typography variant="label" bold>
        {label}
      </Typography>
      <Typography variant="body">{value}</Typography>
    </Card>
  );
};

const styles = StyleSheet.create({
  previousCard: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
});
