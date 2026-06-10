import { useTranslation } from 'react-i18next';

// TODO: Replace CSS stagger with framer-motion motion.ul/motion.li when installed (Batch 4).
// Usage: <motion.ul variants={staggerContainer} initial="hidden" animate="visible">
//          {items.map((item, i) => <motion.li key={i} variants={staggerItem}>...</motion.li>)}
//        </motion.ul>

export interface CurrentlyItem {
  emoji: string;
  label: string;
  url?: string;
}

export interface CurrentlySectionProps {
  items: CurrentlyItem[];
}

const staggerStyle = (index: number): React.CSSProperties => ({
  animation: `fade-in-up 0.5s ease-out ${index * 0.12}s forwards`,
  opacity: 0,
});

export const CurrentlySection = ({ items }: CurrentlySectionProps): React.JSX.Element | null => {
  const { t } = useTranslation('home');

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="site-container py-section-sm md:py-section">
      <h2 className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
        {t('currently.title')}
      </h2>

      <ul className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li
            key={item.label}
            className="flex items-center gap-3"
            style={staggerStyle(index)}
          >
            <span className="text-lg" aria-hidden="true">{item.emoji}</span>

            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-text-secondary underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ) : (
              <span className="font-mono text-sm text-text-secondary">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
