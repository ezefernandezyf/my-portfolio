import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MetaTags } from '../';

afterEach(() => {
  document.head
    .querySelectorAll('meta[data-created-by="MetaTags"], link[data-created-by="MetaTags"]')
    .forEach((el) => el.remove());
});

describe('MetaTags', () => {
  it('crea metas en head y las elimina/restaura al desmontar', () => {
    const prevTitle = document.title;

    const { unmount } = render(
      <MetaTags
        title="Test Page"
        description="Página de prueba"
        pathname="/test"
        image="/custom.png"
        type="article"
        noIndex={true}
      />,
    );

    expect(document.title).toBe('Test Page | Ezequiel Fernández — Front-end Developer');

    const desc = document.head.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    expect(desc).not.toBeNull();
    expect(desc!.getAttribute('content')).toBe('Página de prueba');

    const robots = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    expect(robots).not.toBeNull();
    expect(robots!.getAttribute('content')).toBe('noindex, nofollow');

    const canonical = document.head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    expect(canonical).not.toBeNull();
    expect(canonical!.getAttribute('href')).toMatch(/^https?:\/\/ezefernandez\.com\/test$/);

    const ogImage = document.head.querySelector(
      'meta[property="og:image"]',
    ) as HTMLMetaElement | null;
    expect(ogImage).not.toBeNull();
    expect(ogImage!.getAttribute('content')).toBe('https://ezefernandez.com/custom.png');

    unmount();
    expect(document.title).toBe(prevTitle);

    const leftover = document.head.querySelector(
      'meta[data-created-by="MetaTags"], link[data-created-by="MetaTags"]',
    );
    expect(leftover).toBeNull();
  });

  it('usa valores por defecto y restaura metadatos existentes al desmontar', () => {
    const existingDescription = document.createElement('meta');
    existingDescription.setAttribute('name', 'description');
    existingDescription.setAttribute('content', 'old description');
    document.head.appendChild(existingDescription);

    const existingCanonical = document.createElement('link');
    existingCanonical.setAttribute('rel', 'canonical');
    existingCanonical.setAttribute('href', 'https://old.example.com/');
    document.head.appendChild(existingCanonical);

    const { unmount } = render(<MetaTags />);

    expect(document.title).toBe('Ezequiel Fernández — Front-end Developer');
    expect(existingDescription.getAttribute('content')).toBe(
      'Front-end Developer especializado en React y TypeScript. Construyo aplicaciones web modernas, optimizadas y accesibles.',
    );
    expect(existingCanonical.getAttribute('href')).toMatch(/^https?:\/\/ezefernandez\.com$/);

    const robots = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    expect(robots).not.toBeNull();
    expect(robots!.getAttribute('content')).toBe('index, follow');

    const ogImage = document.head.querySelector(
      'meta[property="og:image"]',
    ) as HTMLMetaElement | null;
    expect(ogImage).not.toBeNull();
    expect(ogImage!.getAttribute('content')).toMatch(
      /^https?:\/\/ezefernandez\.com\/og-image\.png$/,
    );

    unmount();

    expect(existingDescription.getAttribute('content')).toBe('old description');
    expect(existingCanonical.getAttribute('href')).toBe('https://old.example.com/');
  });

  it('usa el fallback absoluto cuando pathname e image no se pueden resolver como URL válidas', () => {
    const { unmount } = render(
      <MetaTags pathname="[broken-path]" image="[broken-image]" />,
    );

    const canonical = document.head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    expect(canonical).not.toBeNull();
    expect(canonical!.getAttribute('href')).toMatch(
      /^https?:\/\/ezefernandez\.com\/\[broken-path\]$/,
    );

    const ogImage = document.head.querySelector(
      'meta[property="og:image"]',
    ) as HTMLMetaElement | null;
    expect(ogImage).not.toBeNull();
    expect(ogImage!.getAttribute('content')).toMatch(
      /^https?:\/\/ezefernandez\.com\/\[broken-image\]$/,
    );

    unmount();
  });
});
