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
    <article className="group flex h-full flex-col border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(2,6,23,0.18)] hover:border-accent/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {visibleTech.map((tName) => (
            <span
              key={tName}
              className="chip chip-outline text-[10px] font-bold uppercase tracking-tighter"
            >
              {tName}
            </span>
          ))}
          {moreCount > 0 ? (
            <span className="chip chip-outline text-[10px] font-bold uppercase tracking-tighter">
              +{moreCount}
            </span>
          ) : null}
        </div>
        {year ? <span className="font-mono text-[10px] text-text-muted">{year}</span> : null}
      </div>

      <div className="mt-8 min-h-32 md:min-h-36">
        <h3 className="mb-3 font-display text-3xl leading-tight tracking-[-0.02em] text-text-primary">
          {projectName}
        </h3>
        <p className="mt-0 max-w-[60ch] text-base leading-relaxed text-text-secondary">
          {projectShort}
        </p>
      </div>

      <div className="mt-8 aspect-video overflow-hidden bg-surface-elevated">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={projectName}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center text-sm text-text-secondary">
            {t('notFound', { defaultValue: 'No preview' })}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-6 border-t border-border/10 pt-6">
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-accent-hover focus-ring"
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
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary transition-colors hover:text-accent focus-ring"
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
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary transition-colors hover:text-accent focus-ring"
          >
            {t('links.demo', { defaultValue: 'View demo' })}
            <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
};
