import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '@/shared/services/http/api-error';
import { AuthFormField } from '../components/auth-form-field';
import { AuthPageFooter } from '../components/auth-page-footer';
import { AuthPageLayout } from '../components/auth-page-layout';
import { AuthPasswordField } from '../components/auth-password-field';
import { AuthSubmitButton } from '../components/auth-submit-button';
import { TermsAcceptance } from '../components/terms-acceptance';
import { useRegisterUser } from '../hooks/use-register-user';
import { registerSchema, type RegisterFormData } from '../schemas/register-schema';

function getRegisterErrorMessage(error: unknown) {
  if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
    return 'Não foi possível criar a conta. Confira os dados informados e tente novamente.';
  }

  return 'Não foi possível criar sua conta. Tente novamente em instantes.';
}

export function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegisterUser();
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', termsAccepted: false },
  });

  async function handleRegister(data: RegisterFormData) {
    if (registerMutation.isPending) return;

    try {
      await registerMutation.mutateAsync(data);
      navigate('/login', { replace: true });
    } catch {
      // A mutação mantém o erro disponível para a mensagem do formulário.
    }
  }

  return (
    <AuthPageLayout
      compact
      title="Junte-se à elite"
      description="Crie sua conta e tenha tudo o que precisa para alcançar resultados extraordinários."
      footer={<AuthPageFooter prompt="Já possui uma conta?" linkLabel="Entrar" to="/login" />}
    >
      <form onSubmit={handleSubmit(handleRegister)} noValidate>
        <AuthFormField
          containerClassName="mb-6"
          id="name"
          label="Nome completo"
          autoComplete="name"
          placeholder="NOME SOBRENOME"
          error={errors.name?.message}
          {...register('name')}
        />

        <AuthFormField
          containerClassName="mb-6"
          id="register-email"
          type="email"
          label="E-mail"
          autoComplete="email"
          placeholder="EXEMPLO@YUME.FIT"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="mb-7 grid gap-4 sm:grid-cols-2">
          <AuthPasswordField
            id="register-password"
            label="Senha"
            autoComplete="new-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <AuthPasswordField
            id="confirm-password"
            label="Confirmar"
            autoComplete="new-password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            showLabel="Exibir confirmação de senha"
            hideLabel="Ocultar confirmação de senha"
            {...register('confirmPassword')}
          />
        </div>

        <div className="mb-9">
          <TermsAcceptance error={errors.termsAccepted?.message} {...register('termsAccepted')} />
        </div>

        {registerMutation.isError ? (
          <p role="alert" className="mb-5 border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {getRegisterErrorMessage(registerMutation.error)}
          </p>
        ) : null}

        <AuthSubmitButton
          label="Criar conta"
          loadingLabel="Criando..."
          loading={registerMutation.isPending}
          disabled={registerMutation.isPending || isSubmitting || !isValid}
        />
      </form>
    </AuthPageLayout>
  );
}
