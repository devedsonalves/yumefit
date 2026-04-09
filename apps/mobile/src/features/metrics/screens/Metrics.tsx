import React from "react";
import { ScrollView, StyleSheet, SafeAreaView, View } from "react-native";
import { colors, spacing } from "../../../shared/theme";
import { Typography } from "../../../shared/components/ui/Typography";
import { Card } from "../../../shared/components/ui/Card";
import { BarChart3, TrendingUp, Calendar } from "lucide-react-native";
import { useTranslation } from "../../../shared/i18n";

const StatItem = ({ label, value, subtext, icon: Icon, color }: any) => (
  <Card style={styles.statCard}>
    <View style={styles.row}>
      <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
        <Icon color={color} size={20} />
      </View>
      <View style={styles.statInfo}>
        <Typography variant="caption" color="textMuted">
          {label}
        </Typography>
        <Typography variant="h3" bold>
          {value}
        </Typography>
        <Typography variant="label" style={{ color }}>
          {subtext}
        </Typography>
      </View>
    </View>
  </Card>
);

export const Metrics = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Typography variant="h2" bold>
            {t("metrics.title")}
          </Typography>
          <View style={styles.periodSelector}>
            <Calendar color={colors.textMuted} size={16} />
            <Typography variant="caption" style={styles.ml}>
              {t("metrics.period")}
            </Typography>
          </View>
        </View>

        <View style={styles.grid}>
          <StatItem
            label={t("metrics.volume")}
            value="42.5 tons"
            subtext={`+12% ${t("metrics.vs_last_month")}`}
            icon={TrendingUp}
            color={colors.primary}
          />
          <StatItem
            label={t("metrics.duration")}
            value="18.4 hrs"
            subtext={`+1.2 hrs ${t("metrics.vs_last_month")}`}
            icon={BarChart3}
            color={colors.success}
          />
        </View>

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t("metrics.pr")}
        </Typography>

        <Card style={styles.prCard}>
          <View style={styles.rowBetween}>
            <View>
              <Typography bold>Back Squat</Typography>
              <Typography variant="caption">Nov 12, 2023</Typography>
            </View>
            <View style={styles.prBadge}>
              <Typography bold color="primary">
                140 kg
              </Typography>
            </View>
          </View>
        </Card>

        {/* Other PRs could go here */}

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t("metrics.evolution")}
        </Typography>
        <Card style={styles.chartPlaceholder}>
          <View style={styles.fakeChart}>
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <View
                key={i}
                style={[
                  styles.chartBar,
                  {
                    height: h,
                    backgroundColor:
                      i === 5 ? colors.primary : colors.surfaceLight,
                  },
                ]}
              />
            ))}
          </View>
          <View style={styles.rowBetween}>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <Typography key={i} variant="label" color="textMuted">
                {d}
              </Typography>
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: {
    padding: spacing.md,
    paddingTop: 100,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  periodSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ml: { marginLeft: 4 },
  grid: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
  },
  statInfo: {
    marginLeft: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  row: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  prCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  prBadge: {
    backgroundColor: "rgba(255, 122, 0, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chartPlaceholder: {
    padding: spacing.lg,
    height: 200,
  },
  fakeChart: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  chartBar: {
    width: 30,
    borderRadius: 6,
  },
});
