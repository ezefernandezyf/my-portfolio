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
const DEFAULT_TITLE = 'Ezequiel Fernández — Front-end Developer';
const DEFAULT_DESC =
  'Front-end Developer especializado en React y TypeScript. Construyo aplicaciones web modernas, optimizadas y accesibles.';
const DEFAULT_IMAGE = '/og-image.png';

function toAbsolute(path?: string) {
  if (!path) return `${SITE_URL}${DEFAULT_IMAGE}`;
  try {
    return new URL(path, SITE_URL).toString();
  } catch {
    return `${SITE_URL}${path}`;
  }
}

function setOrCreateMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  const selector = `meta[${attrName}="${attrValue}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (el) {
    const prev = el.getAttribute('content');
    el.setAttribute('data-prev-content', prev ?? '');
    el.setAttribute('content', content);
    return el;
  } else {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    el.setAttribute('content', content);
    el.setAttribute('data-created-by', 'MetaTags');
    document.head.appendChild(el);
    return el;
  }
}

function setOrCreateLink(rel: string, href: string) {
  const selector = `link[rel="${rel}"]`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (el) {
    const prev = el.getAttribute('href');
    el.setAttribute('data-prev-href', prev ?? '');
    el.setAttribute('href', href);
    return el;
  } else {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute('href', href);
    el.setAttribute('data-created-by', 'MetaTags');
    document.head.appendChild(el);
    return el;
  }
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
    const finalTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    document.title = finalTitle;

    const finalDesc = description ?? DEFAULT_DESC;
    const finalUrl = pathname ? new URL(pathname, SITE_URL).toString() : SITE_URL;
    const finalImage = toAbsolute(image ?? DEFAULT_IMAGE);

    const createdEls: Element[] = [];

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
      createdEls.forEach((el) => {
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
