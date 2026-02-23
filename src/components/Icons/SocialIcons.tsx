import { DocumentTextIcon } from '@heroicons/react/24/outline';

type IconProps = { className?: string };

/** GitHub  */
export const GithubIcon = ({ className = 'h-5 w-5' }: IconProps): React.JSX.Element => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.69 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.17.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.21-1.48 3.18-1.17 3.18-1.17.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.07 0 4.42-2.71 5.39-5.29 5.67.42.36.79 1.07.79 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

/** LinkedIn  */
export const LinkedInIcon = ({ className = 'h-5 w-5' }: IconProps): React.JSX.Element => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.851-3.037-1.852 0-2.135 1.445-2.135 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.636-1.851 3.369-1.851 3.602 0 4.267 2.372 4.267 5.456v6.286zM5.337 7.433a2.066 2.066 0 11.001-4.132 2.066 2.066 0 010 4.132zM6.538 20.452H3.137V9h3.401v11.452z" />
  </svg>
);

/** CV icon  */
export const CvIcon = ({ className = 'h-5 w-5' }: IconProps): React.JSX.Element => (
  <DocumentTextIcon className={className} aria-hidden />
);
