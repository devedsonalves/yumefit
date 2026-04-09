import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colors, radius, spacing } from "../../theme";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "elevated" | "outline" | "flat";
}

export const Card = ({ children, style, variant = "flat" }: CardProps) => {
  return <View style={[styles.base, styles[variant], style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  flat: {},
  outline: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "transparent",
  },
  elevated: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
