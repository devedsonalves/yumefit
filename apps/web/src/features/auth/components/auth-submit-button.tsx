import { ArrowRight, LoaderCircle } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

type AuthSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  loadingLabel: string;
  loading: boolean;
};

export function AuthSubmitButton({ label, loading, loadingLabel, ...props }: AuthSubmitButtonProps) {
  return (
    <button
      className="flex h-16 w-full items-center justify-center gap-4 bg-[#c7ff00] px-6 text-lg font-black uppercase text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c7ff00] disabled:cursor-not-allowed disabled:opacity-60"
      type="submit"
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          {label}
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </>
      )}
    </button>
  );
}
