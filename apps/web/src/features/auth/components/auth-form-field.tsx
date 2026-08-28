import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

export const authInputClassName =
  'auth-input h-14 w-full border-0 border-b border-[#444844] bg-[#1a1d1b] px-4 text-sm text-white outline-none transition placeholder:text-[#555a56] focus:border-[#c7ff00] focus:ring-1 focus:ring-inset focus:ring-[#c7ff00]';

type AuthFormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  labelAction?: ReactNode;
  containerClassName?: string;
};

export const AuthFormField = forwardRef<HTMLInputElement, AuthFormFieldProps>(
  ({ className, containerClassName, error, id, label, labelAction, ...props }, ref) => {
    const errorId = error && id ? `${id}-error` : undefined;

    return (
      <div className={containerClassName}>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[#d5d7d5]" htmlFor={id}>
            {label}
          </label>
          {labelAction}
        </div>
        <input
          ref={ref}
          id={id}
          className={cn(authInputClassName, className)}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...props}
        />
        {error ? <p id={errorId} className="mt-1.5 text-sm text-red-400">{error}</p> : null}
      </div>
    );
  },
);

AuthFormField.displayName = 'AuthFormField';
