import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function calcScrollPercentage(): number {
  if (typeof window === 'undefined') return 0;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return 0;
  return Math.min((scrollTop / docHeight) * 100, 100);
}

export const ScrollProgress = (): React.JSX.Element => {
  const { t } = useTranslation('common');
  const [width, setWidth] = useState(calcScrollPercentage);
  const rafRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      setWidth(calcScrollPercentage());
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    rafRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label={t('readingProgress.aria')}
      aria-valuenow={Math.round(width)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: `${width}%`,
        background: 'var(--color-accent)',
        zIndex: 60,
        transition: reducedMotion ? 'none' : 'width 100ms linear',
        willChange: 'width',
      }}
    />
  );
};
