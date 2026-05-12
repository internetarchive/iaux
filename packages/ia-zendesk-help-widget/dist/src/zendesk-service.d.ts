declare global {
  interface Window {
    /**
     * Zendesk Messenger API injected by the ze-snippet script.
     * Overloaded to cover the two call shapes we use:
     *   - `messenger:on` — subscribe to open/close lifecycle events
     *   - `messenger`    — imperatively open or close the widget panel
     */
    zE?: {
      (
        target: 'messenger:on',
        event: 'open' | 'close',
        callback: () => void,
      ): void;
      (target: 'messenger', action: 'open' | 'close'): void;
    };
  }
}
/**
 * Loads the Zendesk snippet via LazyLoaderService. Guarded by the `ze-snippet`
 * id so multiple widget instances on the same page share a single script tag.
 */
export declare function loadZendeskScript(key: string): Promise<void>;
/**
 * Polls `window.zE` at 100 ms intervals until the Zendesk API is available.
 * The snippet performs its own async initialisation after loading, so
 * `window.zE` may not be set immediately when `script.onload` fires.
 */
export declare function waitForZendesk(timeoutMs?: number): Promise<void>;
