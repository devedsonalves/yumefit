import React from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
} from "react-native";
import { colors, spacing } from "../../../shared/theme";
import { Button } from "../../../shared/components/ui/Button";
import { CaloriesBurnedCard } from "../components/CaloriesBurnedCard";
import { WorkoutProgressCard } from "../components/WorkoutProgressCard";
import { BodyWeightCard } from "../components/BodyWeightCard";
import { ExerciseStatCard } from "../components/ExerciseStatCard";
import { useDashboard } from "../hooks/useDashboard";
import { useTranslation } from "../../../shared/i18n";

export const Dashboard = () => {
  const { data, isLoading } = useDashboard();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CaloriesBurnedCard
          current={data.calories.current}
          goal={data.calories.goal}
        />

        <WorkoutProgressCard
          completed={data.workoutProgress.completed}
          total={data.workoutProgress.total}
          chartData={data.workoutProgress.chartData}
        />

        <BodyWeightCard
          currentWeight={data.weight.current}
          startWeight={data.weight.start}
          period={data.weight.period}
        />

        <View style={styles.rowGrid}>
          {data.stats.map((stat, index) => (
            <ExerciseStatCard
              key={index}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
            />
          ))}
        </View>

        <Button
          title={t("dashboard.start_workout")}
          onPress={() => {}}
          style={styles.startButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: spacing.md,
    paddingTop: 100,
    paddingBottom: 120,
  },
  rowGrid: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  startButton: { height: 60, borderRadius: 20 },
});
