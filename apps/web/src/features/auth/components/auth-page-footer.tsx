import { Link } from 'react-router-dom';

type AuthPageFooterProps = {
  prompt: string;
  linkLabel: string;
  to: string;
};

export function AuthPageFooter({ linkLabel, prompt, to }: AuthPageFooterProps) {
  return (
    <p className="mt-10 text-center text-md text-[#C4C9AC]">
      {prompt}{' '}
      <Link className="font-black uppercase tracking-[0.08em] text-[#c7ff00] transition hover:text-white" to={to}>
        {linkLabel}
      </Link>
    </p>
  );
}
