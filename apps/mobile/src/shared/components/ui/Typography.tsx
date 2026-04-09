import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { colors } from "../../theme";

interface TypographyProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "label";
  color?: keyof typeof colors;
  align?: "left" | "center" | "right";
  style?: TextStyle;
  bold?: boolean;
}

export const Typography = ({
  children,
  variant = "body",
  color = "text",
  align = "left",
  style,
  bold = false,
}: TypographyProps) => {
  return (
    <Text
      style={[
        styles[variant],
        { color: colors[color], textAlign: align },
        bold && styles.bold,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: { fontSize: 32, fontWeight: "800", lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: "700", lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: "600", lineHeight: 28 },
  body: { fontSize: 16, fontWeight: "400", lineHeight: 24 },
  caption: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: colors.textMuted,
  },
  label: { fontSize: 12, fontWeight: "600", letterSpacing: 1 },
  bold: { fontWeight: "bold" },
});
