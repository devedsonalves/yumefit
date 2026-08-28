import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ApiError } from '@/shared/services/http/api-error';
import { AuthFormField } from '../components/auth-form-field';
import { AuthPageFooter } from '../components/auth-page-footer';
import { AuthPageLayout } from '../components/auth-page-layout';
import { AuthPasswordField } from '../components/auth-password-field';
import { AuthSubmitButton } from '../components/auth-submit-button';
import { TermsAcceptance } from '../components/terms-acceptance';
import { useLogin } from '../hooks/use-login';
import { loginSchema, type LoginFormData } from '../schemas/login-schema';

function getLoginErrorMessage(error: unknown) {
  if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
    return 'E-mail ou senha incorretos. Verifique os dados e tente novamente.';
  }

  return 'Não foi possível acessar sua conta. Tente novamente em instantes.';
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '', termsAccepted: false },
  });

  async function handleLogin(data: LoginFormData) {
    if (loginMutation.isPending) return;

    try {
      await loginMutation.mutateAsync(data);
      const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch {
      // A mutação mantém o erro disponível para a mensagem do formulário.
    }
  }

  return (
    <AuthPageLayout
      title="Bem-vindo de volta"
      description="Acesse sua conta e continue transformando objetivos em resultados."
      footer={<AuthPageFooter prompt="Não possui uma conta?" linkLabel="Cadastrar-se" to="/register" />}
    >
      <form className="space-y-7" onSubmit={handleSubmit(handleLogin)} noValidate>
        <AuthFormField
          id="email"
          type="email"
          label="E-mail"
          autoComplete="email"
          placeholder="EXEMPLO@YUME.FIT"
          error={errors.email?.message}
          {...register('email')}
        />

        <AuthPasswordField
          id="password"
          label="Senha"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          labelAction={
            <Link className="text-xs font-semibold text-[#c7ff00] transition hover:text-white" to="/forgot-password">
              Esqueci minha senha
            </Link>
          }
          {...register('password')}
        />

        <TermsAcceptance
          error={errors.termsAccepted?.message}
          errorClassName="mt-1.5"
          {...register('termsAccepted')}
        />

        {loginMutation.isError ? (
          <p role="alert" className="border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {getLoginErrorMessage(loginMutation.error)}
          </p>
        ) : null}

        <AuthSubmitButton
          label="Entrar"
          loadingLabel="Entrando..."
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending || isSubmitting || !isValid}
        />
      </form>
    </AuthPageLayout>
  );
}
