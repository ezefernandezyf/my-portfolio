import { useTranslation } from 'react-i18next';

const skipLinkStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 100,
  padding: '0.75rem 1.5rem',
  background: 'var(--color-accent)',
  color: 'var(--color-bg-primary)',
  fontSize: '0.875rem',
  fontWeight: 600,
  textDecoration: 'none',
  transform: 'translateY(-100%)',
  transition: 'transform 150ms ease-in-out',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  width: 1,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  border: 0,
};

export const SkipLink = (): React.JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <a
      href="#main-content"
      style={skipLinkStyle}
      className="skip-link"
      onFocus={(e) => {
        const target = e.currentTarget;
        target.style.clip = 'auto';
        target.style.clipPath = 'none';
        target.style.height = 'auto';
        target.style.width = 'auto';
        target.style.overflow = 'visible';
        target.style.transform = 'translateY(0)';
      }}
      onBlur={(e) => {
        const target = e.currentTarget;
        target.style.clip = 'rect(0 0 0 0)';
        target.style.clipPath = 'inset(50%)';
        target.style.height = '1px';
        target.style.width = '1px';
        target.style.overflow = 'hidden';
        target.style.transform = 'translateY(-100%)';
      }}
    >
      {t('skipToContent')}
    </a>
  );
};
