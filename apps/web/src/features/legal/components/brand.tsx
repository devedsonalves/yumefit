import { Link } from 'react-router-dom';
import logo from '@/shared/assets/yume-fit-logo.png';

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link className="flex items-center gap-3" to="/">
      <img alt="Yume Fit" className={compact ? 'size-10 object-cover' : 'size-12 object-cover'} src={logo} />
      <span className="font-['Impact','Arial_Narrow',sans-serif] text-[28px] uppercase leading-none tracking-[-0.04em] text-white sm:text-[32px]">
        Yume Fit
      </span>
    </Link>
  );
}
