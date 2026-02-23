import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type Props = {
  images: string[];
  interval?: number;
  autoPlay?: boolean;
  className?: string;
  alt?: string;
};

export const ProjectCarousel = ({
  images,
  interval = 4000,
  autoPlay = true,
  className = '',
  alt = 'Preview',
}: Props): React.JSX.Element => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (!autoPlay || paused || images.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoPlay, paused, images.length, interval]);

  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(false);
  const onFocus = () => setPaused(true);
  const onBlur = () => setPaused(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [images.length]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${alt} carousel`}
    >
      <div className="overflow-hidden rounded-t-md">
        <div
          className="flex transition-transform duration-500 ease-in-out will-change-transform"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {images.map((src, i) => (
            <div key={src} className="w-full shrink-0 max-h-90">
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                loading="lazy"
                className="block w-full h-40 md:h-56 lg:h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        Imagen {index + 1} de {images.length}
      </div>

      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-base-200/80 hover:bg-base-200 rounded-full p-2 focus:outline-none focus-visible:ring focus-visible:ring-primary"
      >
        <ChevronLeftIcon className="w-5 h-5" aria-hidden />
      </button>

      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-base-200/80 hover:bg-base-200 rounded-full p-2 focus:outline-none focus-visible:ring focus-visible:ring-primary"
      >
        <ChevronRightIcon className="w-5 h-5" aria-hidden />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir a imagen ${i + 1}`}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary' : 'bg-base-200/60'}`}
          />
        ))}
      </div>
    </div>
  );
};

