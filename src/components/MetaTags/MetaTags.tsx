import React, { useEffect } from 'react';

type Props = {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

const SITE_URL = (import.meta.env.VITE_SITE_URL as string) ?? 'http://ezefernandez.com';
const DEFAULT_TITLE = 'Ezequiel Fernández - Full Stack Developer';
const DEFAULT_DESC =
  'Full Stack Developer especializado en React, TypeScript y Node.js. Construyo aplicaciones web modernas, optimizadas y accesibles.';
const DEFAULT_IMAGE = '/og-image.png';

function toAbsolute(path?: string) {
  if (!path) return `${SITE_URL}${DEFAULT_IMAGE}`;
  try {
    return new URL(path, SITE_URL).toString();
  } catch {
    return `${SITE_URL}${path}`;
  }
}

/**
 * Skip elements that were prerendered — they already have the correct values
 * and should not be duplicated or overwritten by client-side hydration.
 * `document.title` is still updated via SPA navigation (handled in the effect).
 */
function isPrerendered(el: Element | null): boolean {
  return el?.getAttribute('data-prerendered') === 'true';
}

function setOrCreateMeta(
  attrName: 'name' | 'property',
  attrValue: string,
  content: string,
): HTMLMetaElement | null {
  const selector = `meta[${attrName}="${attrValue}"]`;
  const existing = document.head.querySelector(selector) as HTMLMetaElement | null;

  // If prerendered, preserve original — don't override
  if (isPrerendered(existing)) {
    return null;
  }

  if (existing) {
    const prev = existing.getAttribute('content');
    existing.setAttribute('data-prev-content', prev ?? '');
    existing.setAttribute('content', content);
    return existing;
  }

  const el = document.createElement('meta');
  el.setAttribute(attrName, attrValue);
  el.setAttribute('content', content);
  el.setAttribute('data-created-by', 'MetaTags');
  document.head.appendChild(el);
  return el;
}

function setOrCreateLink(rel: string, href: string): HTMLLinkElement | null {
  const selector = `link[rel="${rel}"]`;
  const existing = document.head.querySelector(selector) as HTMLLinkElement | null;

  // If prerendered, preserve original
  if (isPrerendered(existing)) {
    return null;
  }

  if (existing) {
    const prev = existing.getAttribute('href');
    existing.setAttribute('data-prev-href', prev ?? '');
    existing.setAttribute('href', href);
    return existing;
  }

  const el = document.createElement('link');
  el.setAttribute('rel', rel);
  el.setAttribute('href', href);
  el.setAttribute('data-created-by', 'MetaTags');
  document.head.appendChild(el);
  return el;
}

export const MetaTags = ({
  title,
  description,
  pathname,
  image,
  type = 'website',
  noIndex = false,
}: Props): React.JSX.Element | null => {
  useEffect(() => {
    const prevTitle = document.title;
    const finalTitle = title
      ? (title.includes(DEFAULT_TITLE) ? title : `${title} | ${DEFAULT_TITLE}`)
      : DEFAULT_TITLE;
    document.title = finalTitle;

    const finalDesc = description ?? DEFAULT_DESC;
    const finalUrl = pathname ? new URL(pathname, SITE_URL).toString() : SITE_URL;
    const finalImage = toAbsolute(image ?? DEFAULT_IMAGE);

    const createdEls: (Element | null)[] = [];

    createdEls.push(setOrCreateMeta('name', 'description', finalDesc));
    createdEls.push(
      setOrCreateMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow'),
    );

    createdEls.push(setOrCreateLink('canonical', finalUrl));

    createdEls.push(setOrCreateMeta('property', 'og:type', type));
    createdEls.push(setOrCreateMeta('property', 'og:title', finalTitle));
    createdEls.push(setOrCreateMeta('property', 'og:description', finalDesc));
    createdEls.push(setOrCreateMeta('property', 'og:image', finalImage));
    createdEls.push(setOrCreateMeta('property', 'og:url', finalUrl));
    createdEls.push(setOrCreateMeta('property', 'og:site_name', DEFAULT_TITLE));

    createdEls.push(setOrCreateMeta('name', 'twitter:card', 'summary_large_image'));
    createdEls.push(setOrCreateMeta('name', 'twitter:title', finalTitle));
    createdEls.push(setOrCreateMeta('name', 'twitter:description', finalDesc));
    createdEls.push(setOrCreateMeta('name', 'twitter:image', finalImage));

    return () => {
      document.title = prevTitle;
      createdEls.filter(Boolean).forEach((el) => {
        if (el instanceof HTMLMetaElement) {
          const createdFlag = el.getAttribute('data-created-by');
          if (createdFlag === 'MetaTags') {
            el.remove();
          } else {
            const prev = el.getAttribute('data-prev-content');
            if (prev !== null) {
              el.setAttribute('content', prev);
              el.removeAttribute('data-prev-content');
            }
          }
        } else if (el instanceof HTMLLinkElement) {
          const createdFlag = el.getAttribute('data-created-by');
          if (createdFlag === 'MetaTags') {
            el.remove();
          } else {
            const prevHref = el.getAttribute('data-prev-href');
            if (prevHref !== null) {
              el.setAttribute('href', prevHref);
              el.removeAttribute('data-prev-href');
            }
          }
        }
      });
    };
  }, [title, description, pathname, image, type, noIndex]);

  return null;
};
