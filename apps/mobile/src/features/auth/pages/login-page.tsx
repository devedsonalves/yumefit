import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { routes } from '@/app/routes';
import { LoginFormData, loginSchema } from '@/features/auth/schemas/login-schema';
import { useLogin } from '@/features/auth/hooks/use-login';
import { Button } from '@/shared/components/ui/button';
import { AppTextInput } from '@/shared/components/ui/text-input';
import { Screen } from '@/shared/components/layout/screen';
import { ApiError } from '@/shared/services/http/api-error';
import { colors, spacing } from '@/shared/theme/tokens';

export function LoginPage() {
  const loginMutation = useLogin();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleLogin(data: LoginFormData) {
    try {
      await loginMutation.mutateAsync(data);
      router.replace(routes.home);
    } catch {
      // The mutation state renders the error message.
    }
  }

  const errorMessage =
    loginMutation.error instanceof ApiError ? loginMutation.error.message : loginMutation.error ? 'Falha ao entrar.' : null;

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brand}>Yume Fit</Text>
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>Acesse sua conta para acompanhar treinos e progresso.</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <AppTextInput
                autoCapitalize="none"
                autoComplete="email"
                error={fieldState.error?.message}
                inputMode="email"
                label="Email"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <AppTextInput
                autoCapitalize="none"
                error={fieldState.error?.message}
                label="Senha"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                secureTextEntry
                value={field.value}
              />
            )}
          />

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <Button label="Entrar" loading={loginMutation.isPending} onPress={form.handleSubmit(handleLogin)} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  header: {
    gap: spacing.sm,
  },
  brand: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
  },
  form: {
    gap: spacing.lg,
  },
  error: {
    color: colors.danger,
    fontSize: 14,
  },
});
