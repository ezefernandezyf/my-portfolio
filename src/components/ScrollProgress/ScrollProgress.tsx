import { useEffect, useRef, useState } from 'react';

function calcScrollPercentage(): number {
  if (typeof window === 'undefined') return 0;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return 0;
  return Math.min((scrollTop / docHeight) * 100, 100);
}

export const ScrollProgress = (): React.JSX.Element => {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastAriaUpdate = useRef(0);
  const [ariaValueNow, setAriaValueNow] = useState(0);
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
      const pct = calcScrollPercentage();
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;
      }
      // Debounce ARIA updates to ~200ms — no need for 60fps here
      const now = Date.now();
      if (now - lastAriaUpdate.current >= 200) {
        setAriaValueNow(Math.round(pct));
        lastAriaUpdate.current = now;
      }
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
      ref={barRef}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={ariaValueNow}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: '0%',
        background: 'var(--color-accent)',
        zIndex: 60,
        transition: reducedMotion ? 'none' : 'width 100ms linear',
        willChange: 'width',
      }}
    />
  );
};
