import { CodeBracketIcon, BoltIcon, ServerIcon } from '@heroicons/react/24/outline';
import { GithubIcon } from '../';

type Props = {
  name: string;
  showIcon?: boolean;
  size?: 'sm' | 'md';
};

const initials = (s: string) =>
  s
    .split(/[\s]+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const TechIcon = ({ name, size = 'sm' }: { name: string; size?: 'sm' | 'md' }) => {
  const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  const normalized = name.toLowerCase();
  if (normalized.includes('git') || normalized.includes('github')) {
    return <GithubIcon />;
  }

  if (normalized.includes('vite')) {
    return <BoltIcon className={cls} aria-hidden />;
  }

  if (normalized.includes('zod') || normalized.includes('axios') || normalized.includes('tmdb')) {
    return <ServerIcon className={cls} aria-hidden />;
  }

  if (
    normalized.includes('prettier') ||
    normalized.includes('eslint') ||
    normalized.includes('hook form')
  ) {
    return <CodeBracketIcon className={cls} aria-hidden />;
  }

  return (
    <div
      aria-hidden
      className={`${size === 'sm' ? 'w-4 h-4 text-[10px]' : 'w-5 h-5 text-xs'} rounded-full bg-base-200 inline-flex items-center justify-center font-semibold`}
    >
      {initials(name)}
    </div>
  );
};

export const TechChip = ({ name, showIcon = true, size = 'sm' }: Props) => {
  return (
    <span className="inline-flex items-center gap-2">
      {showIcon && (
        <span className="shrink-0" aria-hidden>
          <TechIcon name={name} size={size} />
        </span>
      )}
      <span className="inline-block px-3 py-1 rounded-full bg-base-200 text-xs">{name}</span>
    </span>
  );
};
