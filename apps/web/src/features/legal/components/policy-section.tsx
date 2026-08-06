import type { ReactNode } from 'react';

type PolicySectionProps = {
  children: ReactNode;
  title: string;
};

export function PolicySection({ children, title }: PolicySectionProps) {
  return (
    <section className="border-l-4 border-[#1e2020] pl-6 sm:pl-8">
      <h2 className="font-['Impact','Arial_Narrow',sans-serif] text-[28px] uppercase leading-tight tracking-[-0.025em] text-white sm:text-[32px]">
        {title}
      </h2>
      <div className="mt-4 text-[17px] leading-[1.625] text-[#c4c9ac] sm:mt-3 sm:text-[18px]">{children}</div>
    </section>
  );
}
