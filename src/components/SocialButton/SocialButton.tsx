import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
};

export const SocialButton = ({
  to,
  ariaLabel,
  className = '',
  children,
}: Props): React.JSX.Element => {
  const isExternal = /^https?:\/\//.test(to) || to.startsWith('mailto:');

  const baseClass = `btn btn-ghost btn-sm ${className}`;

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={baseClass}
      >
        <span className="sr-only">{ariaLabel}</span>
        <span className="inline-flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <Link to={to} aria-label={ariaLabel} className={baseClass}>
      <span className="sr-only">{ariaLabel}</span>
      <span className="inline-flex items-center gap-2">{children}</span>
    </Link>
  );
};
