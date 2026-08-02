import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { AuthFormField } from './auth-form-field';

type AuthPasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  error?: string;
  labelAction?: ReactNode;
  showLabel?: string;
  hideLabel?: string;
};

export const AuthPasswordField = forwardRef<HTMLInputElement, AuthPasswordFieldProps>(
  ({ error, hideLabel = 'Ocultar senha', label, labelAction, showLabel = 'Exibir senha', ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <AuthFormField
          ref={ref}
          label={label}
          labelAction={labelAction}
          error={error}
          type={visible ? 'text' : 'password'}
          className="pr-12"
          {...props}
        />
        <button
          className="absolute right-0 top-8 grid h-14 w-12 place-items-center text-[#858985] transition hover:text-[#c7ff00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c7ff00]"
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
        >
          {visible ? <EyeOff aria-hidden="true" className="h-5 w-5" /> : <Eye aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>
    );
  },
);

AuthPasswordField.displayName = 'AuthPasswordField';
