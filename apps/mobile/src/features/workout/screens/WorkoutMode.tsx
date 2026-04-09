import React, { useLayoutEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, spacing } from "../../../shared/theme";
import { Typography } from "../../../shared/components/ui/Typography";
import { Button } from "../../../shared/components/ui/Button";
import { WorkoutTimer } from "../components/WorkoutTimer";
import { PreviousRecordCard } from "../components/PreviousRecordCard";
import { WorkoutInputGrid } from "../components/WorkoutInputGrid";
import { NextExerciseItem } from "../components/NextExerciseItem";
import { useWorkout } from "../hooks/useWorkout";
import { useTranslation } from "../../../shared/i18n";

export const WorkoutMode = () => {
  const navigation = useNavigation();
  const { timeDisplay, isResting, resetTimer } = useWorkout();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Supino Inclinado",
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <WorkoutTimer
          time={timeDisplay}
          label={isResting ? t("workout.rest") : t("workout.ready")}
        />

        <PreviousRecordCard
          label={t("workout.last_time")}
          value="12 reps • 60kg"
        />

        <WorkoutInputGrid
          weight="65"
          reps="10"
          weightLabel={t("workout.weight")}
          repsLabel={t("workout.reps")}
        />

        <Button
          title={t("workout.finish_set")}
          onPress={resetTimer}
          style={styles.finishButton}
        />

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t("workout.next_exercises")}
        </Typography>

        <NextExerciseItem name="Crucifixo Reto" details="3 séries • 12 reps" />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={t("workout.finish_workout")}
          variant="outline"
          onPress={() => navigation.goBack()}
          style={styles.footerButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingTop: 100,
  },
  finishButton: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerButton: {
    borderColor: colors.error,
  },
});
