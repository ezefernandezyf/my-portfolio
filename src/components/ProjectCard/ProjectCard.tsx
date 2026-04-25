import { Link } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { GithubIcon } from '../Icons/SocialIcons';

type Props = {
  id: string;
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

  const visibleTech = tech.slice(0, 3);
  const moreCount = Math.max(0, tech.length - visibleTech.length);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const projectName = name ?? (nameKey ? t(nameKey) : '');
  const projectShort = short ?? (shortKey ? t(shortKey) : '');

  const imgSrc = image ?? images[0];

  return (
    <article className="group flex h-full flex-col border border-outline-variant/20 bg-surface-container-lowest p-8 transition-all duration-300 hover:border-outline-variant dark:border-outline-variant/30 dark:bg-surface">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {visibleTech.map((tName) => (
            <span
              key={tName}
              className="border border-outline-variant/40 px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant"
            >
              {tName}
            </span>
          ))}
          {moreCount > 0 ? (
            <span className="border border-outline-variant/40 px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">
              +{moreCount}
            </span>
          ) : null}
        </div>
        {year ? <span className="text-[10px] font-mono text-outline">{year}</span> : null}
      </div>

      <div className="mt-8 min-h-32 md:min-h-36">
        <h3 className="mb-3 font-headline text-3xl font-bold leading-tight tracking-[-0.02em] text-on-surface">
          {projectName}
        </h3>
        <p className="mt-0 max-w-[60ch] text-base leading-relaxed text-on-surface-variant">
          {projectShort}
        </p>
      </div>

      <div className="mt-8 aspect-video overflow-hidden bg-surface-container-low">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={projectName}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center text-sm text-base-content/50">
            {t('notFound', { defaultValue: 'No preview' })}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-6 border-t border-outline-variant/10 pt-6">
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-fixed hover:underline focus-ring"
          aria-label={`${t('links.caseStudy', { defaultValue: 'View case study' })} ${projectName}`}
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden />
          {t('links.caseStudy', { defaultValue: 'View case study' })}
        </Link>

        {repo && (
          <a
            onClick={stop}
            aria-label={`${t('links.repo', { defaultValue: 'View repo' })} ${projectName}`}
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary focus-ring"
          >
            <GithubIcon className="w-4 h-4" />
            {t('links.repo', { defaultValue: 'View repo' })}
          </a>
        )}
        {demo && (
          <a
            onClick={stop}
            aria-label={`${t('links.demo', { defaultValue: 'View demo' })} ${projectName}`}
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary focus-ring"
          >
            {t('links.demo', { defaultValue: 'View demo' })}
            <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
};
