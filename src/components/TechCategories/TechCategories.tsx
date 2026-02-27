import { useTranslation } from 'react-i18next';
import { TechChip } from './TechChip';

type Category = {
  title?: string;
  titleKey?: string;
  items: readonly string[];
};

type Abilities = {
  title?: string;
  titleKey?: string;
  items: readonly string[];
};

type Props = {
  categories: readonly Category[];
  abilities: readonly Abilities[];
};

export const TechCategories = ({ categories, abilities }: Props) => {
  const namespace = 'aboutpage';
  const { t } = useTranslation(namespace);

  function normalizeKeyForNs(key?: string) {
    if (!key) return '';

    if (key.includes(':')) return key;
    const parts = key.split('.');
    if (parts.length > 1 && parts[0] === namespace) {
      return parts.slice(1).join('.');
    }
    return key;
  }

  const translatedAbilitiesRaw = t('abilities.items', { returnObjects: true }) as unknown;
  const hasTranslatedAbilities =
    Array.isArray(translatedAbilitiesRaw) && translatedAbilitiesRaw.length > 0;
  const translatedAbilities = hasTranslatedAbilities ? (translatedAbilitiesRaw as string[]) : null;

  return (
    <>
      <div className="mt-6 p-4 rounded-lg bg-base-100 border border-base-200">
        <h3 className="text-sm font-semibold mb-3">
          {t('categoriesTitle.stack', { defaultValue: 'Stack' })}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {categories.map((cat, idx) => {
            const keyForItem = cat.title ?? cat.titleKey ?? `category-${idx}`;
            const title =
              cat.title ?? (cat.titleKey ? t(normalizeKeyForNs(cat.titleKey)) : undefined);

            return (
              <div key={keyForItem}>
                <h4 className="text-xs font-medium text-muted mb-2">{title}</h4>

                <ul role="list" className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <li key={tech}>
                      <TechChip name={tech} showIcon={false} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-base-100 border border-base-200">
        <h3 className="text-sm font-semibold mb-3">
          {t('abilities.title', { defaultValue: 'Habilidades profesionales' })}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {translatedAbilities ? (
            <div key="abilities-translated">
              <ul role="list" className="flex flex-wrap gap-2">
                {translatedAbilities.map((ab) => (
                  <li key={ab}>
                    <TechChip name={ab} showIcon={false} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            abilities.map((abi, idx) => {
              const listKey = abi.title ?? abi.titleKey ?? `abilities-${idx}`;
              return (
                <div key={listKey}>
                  {abi.title || abi.titleKey ? (
                    <div className="text-xs font-medium text-muted mb-2">
                      {abi.title ?? (abi.titleKey ? t(normalizeKeyForNs(abi.titleKey)) : '')}
                    </div>
                  ) : null}

                  <ul role="list" className="flex flex-wrap gap-2">
                    {abi.items.map((tech) => (
                      <li key={tech}>
                        <TechChip name={tech} showIcon={false} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
