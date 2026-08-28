import { forwardRef, type InputHTMLAttributes } from 'react';

type TermsAcceptanceProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  errorClassName?: string;
};

export const TermsAcceptance = forwardRef<HTMLInputElement, TermsAcceptanceProps>(
  ({ error, errorClassName = 'mt-1.5', ...props }, ref) => (
    <div>
      <label className="flex w-fit cursor-pointer items-center gap-3 text-xs text-[#C4C9AC]">
        <input
          ref={ref}
          className="h-4 w-4 shrink-0 accent-[#c7ff00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c7ff00]"
          type="checkbox"
          aria-required="true"
          aria-invalid={Boolean(error)}
          {...props}
        />
        <span>
          Eu concordo com os <span className="font-semibold text-[#c7ff00]">Termos de Uso</span> e a{' '}
          <span className="font-semibold text-[#c7ff00]">Política de Privacidade</span>.
        </span>
      </label>
      {error ? <p className={`${errorClassName} text-sm text-red-400`}>{error}</p> : null}
    </div>
  ),
);

TermsAcceptance.displayName = 'TermsAcceptance';
