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

export {};
