import React from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors, spacing, radius } from "../../../shared/theme";
import { Typography } from "../../../shared/components/ui/Typography";
import { Card } from "../../../shared/components/ui/Card";
import {
  User,
  Settings,
  Bell,
  Lock,
  ChevronRight,
  LogOut,
  CreditCard,
  Languages,
} from "lucide-react-native";
import { useTranslation } from "../../../shared/i18n";

const MenuOption = ({
  label,
  icon: Icon,
  color = colors.text,
  onPress,
}: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.row}>
      <View style={[styles.menuIconBox, { backgroundColor: `${color}10` }]}>
        <Icon color={color} size={20} />
      </View>
      <Typography style={styles.ml}>{label}</Typography>
    </View>
    <ChevronRight color={colors.textMuted} size={18} />
  </TouchableOpacity>
);

export const Profile = () => {
  const { t, language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=forgefit" }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Typography variant="h2" bold>
              Devedson Alves
            </Typography>
            <Typography variant="caption" color="textMuted">
              {t("profile.member_since")} 2023
            </Typography>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Settings color={colors.text} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Typography variant="h2" bold color="primary">
              24
            </Typography>
            <Typography variant="label" color="textMuted">
              {t("profile.workouts")}
            </Typography>
          </View>
          <View style={[styles.statBox, styles.borderLeft]}>
            <Typography variant="h2" bold color="primary">
              12k
            </Typography>
            <Typography variant="label" color="textMuted">
              {t("profile.calories")}
            </Typography>
          </View>
          <View style={[styles.statBox, styles.borderLeft]}>
            <Typography variant="h2" bold color="primary">
              15h
            </Typography>
            <Typography variant="label" color="textMuted">
              {t("profile.hours")}
            </Typography>
          </View>
        </View>

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t("profile.account")}
        </Typography>
        <Card style={styles.menuCard}>
          <MenuOption label={t("profile.personal_info")} icon={User} />
          <View style={styles.divider} />
          <MenuOption label={t("profile.notifications")} icon={Bell} />
          <View style={styles.divider} />
          <MenuOption label={t("profile.subscription")} icon={CreditCard} />
          <View style={styles.divider} />
          <MenuOption
            label={`${language.toUpperCase()} (Switch)`}
            icon={Languages}
            onPress={toggleLanguage}
            color={colors.primary}
          />
        </Card>

        <Typography variant="h3" bold style={styles.sectionTitle}>
          {t("profile.security")}
        </Typography>
        <Card style={styles.menuCard}>
          <MenuOption label={t("profile.privacy")} icon={Lock} />
          <View style={styles.divider} />
          <MenuOption
            label={t("profile.logout")}
            icon={LogOut}
            color={colors.error}
          />
        </Card>

        <View style={styles.footer}>
          <Typography variant="label" color="textMuted" align="center">
            ForgeFit v1.0.0
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: {
    padding: spacing.md,
    paddingTop: 80,
    paddingBottom: 120,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  profileInfo: {
    marginLeft: spacing.lg,
    flex: 1,
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  menuCard: {
    padding: 0,
    marginBottom: spacing.lg,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
  },
  row: { flexDirection: "row", alignItems: "center" },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ml: { marginLeft: 12 },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  footer: {
    marginTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
});
