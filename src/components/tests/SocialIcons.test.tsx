import { render } from '@testing-library/react';

import { CvIcon, GithubIcon, LinkedInIcon } from '../Icons/SocialIcons';

describe('SocialIcons', () => {
  it('renderiza los iconos con el tamaño por defecto', () => {
    const { container } = render(
      <div>
        <GithubIcon />
        <LinkedInIcon />
        <CvIcon />
      </div>,
    );

    expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(3);
  });

  it('acepta className personalizado', () => {
    const { container } = render(
      <div>
        <GithubIcon className="h-8 w-8" />
        <LinkedInIcon className="h-8 w-8" />
        <CvIcon className="h-8 w-8" />
      </div>,
    );

    expect(container.querySelectorAll('svg.h-8.w-8').length).toBeGreaterThanOrEqual(2);
  });
});