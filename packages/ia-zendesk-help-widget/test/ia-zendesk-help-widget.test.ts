import { describe, expect, test, vi, afterEach, beforeEach } from 'vitest';
import { html } from 'lit';

import type { IAZendeskHelpWidget } from '../src/ia-zendesk-help-widget';
import '../src/ia-zendesk-help-widget';
import { fixture } from './fixture';

const WIDGET_KEY = 'test-key';

// Mock LazyLoaderService so loadZendeskScript never makes a real network call.
vi.mock('@internetarchive/lazy-loader-service', () => ({
  LazyLoaderService: class {
    loadScript() {
      return Promise.resolve();
    }
  },
}));

function mockMatchMedia(matches: boolean) {
  const listeners: ((e: MediaQueryListEvent) => void)[] = [];
  const mql = {
    matches,
    addEventListener: vi.fn(
      (_: string, cb: (e: MediaQueryListEvent) => void) => {
        listeners.push(cb);
      },
    ),
    removeEventListener: vi.fn(),
  };
  vi.spyOn(window, 'matchMedia').mockReturnValue(
    mql as unknown as MediaQueryList,
  );
  return {
    mql,
    fireChange: (newMatches: boolean) =>
      listeners.forEach(cb =>
        cb({ matches: newMatches } as MediaQueryListEvent),
      ),
  };
}

describe('IAZendeskHelpWidget', () => {
  beforeEach(() => {
    // Default to wide viewport so the label is visible unless a test overrides this.
    mockMatchMedia(false);
    // Make window.zE available so waitForZendesk resolves on first poll.
    (window as any).zE = vi.fn();
  });

  afterEach(() => {
    delete (window as any).zE;
    vi.restoreAllMocks();
  });

  describe('rendering', () => {
    test('renders the Help button', async () => {
      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.help-widget')).toBeTruthy();
    });

    test('button shows "Help" label text', async () => {
      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.label')?.textContent?.trim()).toBe(
        'Help',
      );
    });

    test('renders question icon when idle', async () => {
      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.icon-question')).toBeTruthy();
      expect(el.shadowRoot?.querySelector('.icon-loader')).toBeFalsy();
    });

    test('renders loader icon while isLoading is true', async () => {
      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );
      (el as any).isLoading = true;
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector('.icon-loader')).toBeTruthy();
      expect(el.shadowRoot?.querySelector('.icon-question')).toBeFalsy();
    });
  });

  describe('breakpoint / compact mode', () => {
    test('hides label when isCompact is true', async () => {
      mockMatchMedia(true);
      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.label')).toBeFalsy();
    });

    test('shows label when isCompact is false', async () => {
      mockMatchMedia(false);
      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.label')).toBeTruthy();
    });

    test('updates isCompact when media query changes', async () => {
      const { fireChange } = mockMatchMedia(false);
      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.label')).toBeTruthy();
      fireChange(true);
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector('.label')).toBeFalsy();
    });

    test('removes media query listener when element disconnects', async () => {
      const { mql } = mockMatchMedia(false);
      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );
      el.remove();
      expect(mql.removeEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
    });
  });

  describe('zendeskHelpButtonClicked event', () => {
    test('fires when the Help button is clicked', async () => {
      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );

      let fired = false;
      el.addEventListener('zendeskHelpButtonClicked', () => {
        fired = true;
      });

      el.shadowRoot?.querySelector<HTMLButtonElement>('.help-widget')?.click();
      await el.updateComplete;

      expect(fired).toBe(true);
    });
  });

  describe('Zendesk integration', () => {
    test('calls window.zE to open messenger after click', async () => {
      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );

      el.shadowRoot?.querySelector<HTMLButtonElement>('.help-widget')?.click();
      // waitForZendesk polls every 100ms — wait 200ms for it to resolve.
      await new Promise(r => setTimeout(r, 200));
      await el.updateComplete;

      expect((window as any).zE).toHaveBeenCalledWith('messenger', 'open');
    });

    test('does not reload script on subsequent clicks', async () => {
      const { LazyLoaderService } =
        await import('@internetarchive/lazy-loader-service');
      const loadScriptSpy = vi.spyOn(LazyLoaderService.prototype, 'loadScript');

      const el = await fixture<IAZendeskHelpWidget>(
        html`<ia-zendesk-help-widget
          .widgetKey=${WIDGET_KEY}
        ></ia-zendesk-help-widget>`,
      );

      const btn =
        el.shadowRoot?.querySelector<HTMLButtonElement>('.help-widget');
      btn?.click();
      // Wait long enough for waitForZendesk (100ms poll) to resolve and set zendeskReady.
      await new Promise(r => setTimeout(r, 200));
      btn?.click();
      await new Promise(r => setTimeout(r, 200));
      await el.updateComplete;

      expect(loadScriptSpy).toHaveBeenCalledTimes(1);
    });
  });
});
