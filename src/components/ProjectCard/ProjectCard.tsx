import { Link } from 'react-router-dom';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

type Props = {
  id: string;
  name: string;
  short: string;
  repo?: string;
  demo?: string;
  image?: string;
  tech?: string[];
  year?: number;
};

export const ProjectCard = ({ id, name, short, repo, demo, image, tech = [], year }: Props) => {
  const visibleTech = tech.slice(0, 5);
  const moreCount = Math.max(0, tech.length - visibleTech.length);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <article className="group rounded-lg overflow-hidden border bg-base-100 transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg">
      <div className="w-full aspect-video bg-base-200">
        {image ? (
          <img
            src={image}
            alt={`${name} preview`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-muted">
            No preview
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/projects/${id}`}
            className="block text-left focus:outline-none focus-visible:ring focus-visible:ring-primary"
            aria-label={`Case study ${name}`}
          >
            <h3 className="font-semibold text-lg">{name}</h3>
            {year && <div className="text-xs text-muted">{year}</div>}
          </Link>
        </div>

        <p className="text-sm text-muted mt-2 max-h-14 overflow-hidden" aria-hidden>
          {short}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {visibleTech.map((t) => (
            <span key={t} className="px-2 py-1 rounded bg-base-200 text-xs">
              {t}
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
            aria-label={`Ver case study ${name}`}
          >
            Ver case study
          </Link>

          {repo && (
            <a
              onClick={stop}
              aria-label={`Repositorio ${name}`}
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-primary hover:underline"
            >
              Ver repo
            </a>
          )}
          {demo && (
            <a
              onClick={stop}
              aria-label={`Demo ${name}`}
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-base-300 hover:bg-base-300"
            >
              Ver demo
              <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
