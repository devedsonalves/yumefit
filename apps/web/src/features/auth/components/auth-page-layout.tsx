import { useState, type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

type AuthPageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
  compact?: boolean;
};

export function AuthPageLayout({ children, compact = false, description, footer, title }: AuthPageLayoutProps) {
  const [heroImageAvailable, setHeroImageAvailable] = useState(true);

  return (
    <div className="min-h-[100dvh] bg-[#101211]">
      <main className="min-h-[100dvh] w-full bg-[#101211] text-white lg:grid lg:h-[100dvh] lg:min-h-0 lg:grid-cols-2">
        <section className="relative hidden min-h-0 overflow-hidden bg-[#151816] lg:block" aria-label="Yume Fit">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,#3c413e_0%,#171a18_43%,#090a09_100%)]" />
          {heroImageAvailable ? (
            <img
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="/images/auth-hero-wide.png"
              alt="Atleta treinando na barra fixa"
              onError={() => setHeroImageAvailable(false)}
            />
          ) : null}
        </section>

        <section
          className={cn(
            'flex min-h-[100dvh] items-center justify-center px-6 sm:px-10 lg:min-h-0 lg:px-12 xl:px-14',
            compact ? 'py-10' : 'py-12',
          )}
        >
          <div className={cn('w-full', compact ? 'max-w-[510px]' : 'max-w-[470px]')}>
            <div
              className={cn(
                'h-12 w-48 overflow-hidden lg:hidden',
                compact ? 'mb-8' : 'mb-10',
              )}
            >
              <img
                className="h-auto w-60 max-w-none -translate-x-8 -translate-y-8"
                src="/images/web-logo.png"
                alt="Yume Fit"
              />
            </div>

            <header className={compact ? 'mb-8' : 'mb-10'}>
              <h1 className="text-4xl font-black uppercase leading-none tracking-[-0.035em]">{title}</h1>
              <p className="mt-3 max-w-md text-md leading-relaxed text-[#C4C9AC]">{description}</p>
            </header>

            {children}
            {footer}
          </div>
        </section>
      </main>
    </div>
  );
}
