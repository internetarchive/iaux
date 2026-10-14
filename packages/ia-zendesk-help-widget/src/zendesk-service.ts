import './zendesk-types';
import { LazyLoaderService } from '@internetarchive/lazy-loader-service';
const lazyLoader = new LazyLoaderService();

const SNIPPET_BASE_URL = 'https://static.zdassets.com/ekr/snippet.js';

/**
 * Loads the Zendesk snippet via LazyLoaderService. Guarded by the `ze-snippet`
 * id so multiple widget instances on the same page share a single script tag.
 */
export function loadZendeskScript(key: string): Promise<void> {
  return lazyLoader.loadScript({
    src: `${SNIPPET_BASE_URL}?key=${key}`,
    attributes: { id: 'ze-snippet' },
  });
}

/**
 * Polls `window.zE` at 100 ms intervals until the Zendesk API is available.
 * The snippet performs its own async initialisation after loading, so
 * `window.zE` may not be set immediately when `script.onload` fires.
 */
export function waitForZendesk(timeoutMs = 10_000): Promise<void> {
  return new Promise((resolve, reject) => {
    const check = setInterval(() => {
      if (window.zE) {
        clearInterval(check);
        clearTimeout(timeout);
        resolve();
      }
    }, 100);
    const timeout = setTimeout(() => {
      clearInterval(check);
      reject(new Error('Zendesk API did not initialise in time'));
    }, timeoutMs);
  });
}
