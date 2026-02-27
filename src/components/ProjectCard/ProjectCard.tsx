import { Link } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

type Props = {
  id: string;
  // texto directo o key i18n
  name?: string;
  nameKey?: string;
  short?: string;
  shortKey?: string;
  repo?: string;
  demo?: string;
  image?: string;
  images?: string[];
  tech?: string[];
  year?: number;
  featured?: boolean;
};

export const ProjectCard = ({
  id,
  name,
  nameKey,
  short,
  shortKey,
  repo,
  demo,
  image,
  images = [],
  tech = [],
  year,
}: Props) => {
  const { t } = useTranslation('projects');

  const visibleTech = tech.slice(0, 5);
  const moreCount = Math.max(0, tech.length - visibleTech.length);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const projectName = name ?? (nameKey ? t(nameKey) : '');
  const projectShort = short ?? (shortKey ? t(shortKey) : '');

  const imgSrc = image ?? images[0];

  return (
    <article className="group rounded-lg overflow-hidden border bg-base-100 transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg">
      <div className="w-full aspect-video bg-base-200">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={`${projectName} preview`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-muted">
            {t('notFound', { defaultValue: 'No preview' })}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/projects/${id}`}
            className="block text-left focus:outline-none focus-visible:ring focus-visible:ring-primary"
            aria-label={`${t('links.caseStudy', { defaultValue: 'Ver case study' })} ${projectName}`}
          >
            <h3 className="font-semibold text-lg">{projectName}</h3>
            {year && <div className="text-xs text-muted">{year}</div>}
          </Link>
        </div>

        <p className="text-sm text-muted mt-2 max-h-14 overflow-hidden" aria-hidden>
          {projectShort}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {visibleTech.map((tName) => (
            <span key={tName} className="px-2 py-1 rounded bg-base-200 text-xs">
              {tName}
            </span>
          ))}
          {moreCount > 0 && (
            <span className="px-2 py-1 rounded bg-base-200 text-xs">+{moreCount}</span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <Link
            to={`/projects/${id}`}
            className="hover:text-primary hover:underline"
            aria-label={`${t('links.caseStudy', { defaultValue: 'Ver case study' })} ${projectName}`}
          >
            {t('links.caseStudy', { defaultValue: 'Ver case study' })}
          </Link>

          {repo && (
            <a
              onClick={stop}
              aria-label={`${t('links.repo', { defaultValue: 'Ver repo' })} ${projectName}`}
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-primary hover:underline"
            >
              {t('links.repo', { defaultValue: 'Ver repo' })}
            </a>
          )}
          {demo && (
            <a
              onClick={stop}
              aria-label={`${t('links.demo', { defaultValue: 'Ver demo' })} ${projectName}`}
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-base-300 hover:bg-base-300"
            >
              {t('links.demo', { defaultValue: 'Ver demo' })}
              <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
