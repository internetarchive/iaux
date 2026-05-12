import { describe, expect, test, vi, afterEach, beforeEach } from 'vitest';
import { html } from 'lit';

import type { IAZendeskWidget } from '../src/ia-zendesk-widget';
import '../src/ia-zendesk-widget';
import { fixture } from './fixture';

const WIDGET_KEY = 'test-key';

/**
 * Creates a matchMedia stub and returns helpers to assert on it and fire
 * change events. Must be called before the element is connected to the DOM
 * so that connectedCallback picks up the mock.
 */
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

describe('IAZendeskWidget', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    document.getElementById('ze-snippet')?.remove();
    delete (window as any).zE;
    vi.restoreAllMocks();
  });

  describe('rendering', () => {
    test('renders the Help button', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.help-widget')).toBeTruthy();
    });

    test('button shows "Help" label text', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.label')?.textContent?.trim()).toBe(
        'Help',
      );
    });

    test('renders question icon when idle', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.icon-question')).toBeTruthy();
      expect(el.shadowRoot?.querySelector('.icon-loader')).toBeFalsy();
    });

    test('renders loader icon while isLoading is true', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      (el as any).isLoading = true;
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector('.icon-loader')).toBeTruthy();
      expect(el.shadowRoot?.querySelector('.icon-question')).toBeFalsy();
    });
  });

  describe('zendeskHelpButtonClicked event', () => {
    test('fires when the Help button is clicked', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );

      let fired = false;
      el.addEventListener('zendeskHelpButtonClicked', () => {
        fired = true;
      });

      (el as any).initiateZenDesk = async () => {
        el.dispatchEvent(new Event('zendeskHelpButtonClicked'));
      };

      el.shadowRoot?.querySelector<HTMLButtonElement>('.help-widget')?.click();
      await el.updateComplete;

      expect(fired).toBe(true);
    });
  });

  describe('breakpoint / compact mode', () => {
    test('shows "Help" label when viewport is wider than breakpoint', async () => {
      mockMatchMedia(false);
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.label')).toBeTruthy();
    });

    test('hides "Help" label when viewport is narrower than breakpoint', async () => {
      mockMatchMedia(true);
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.label')).toBeFalsy();
    });

    test('hides label when viewport shrinks below breakpoint at runtime', async () => {
      const { fireChange } = mockMatchMedia(false);
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      fireChange(true);
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector('.label')).toBeFalsy();
    });

    test('shows label when viewport grows above breakpoint at runtime', async () => {
      const { fireChange } = mockMatchMedia(true);
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      fireChange(false);
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector('.label')).toBeTruthy();
    });

    test('uses default 767px breakpoint in media query', async () => {
      await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 767px)');
    });

    test('uses custom breakpoint in media query', async () => {
      await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget
          .widgetKey=${WIDGET_KEY}
          .breakpoint=${480}
        ></ia-zendesk-widget>`,
      );
      expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 480px)');
    });

    test('rebuilds media query when breakpoint property changes', async () => {
      const { mql } = mockMatchMedia(false);
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      el.breakpoint = 480;
      await el.updateComplete;
      expect(mql.removeEventListener).toHaveBeenCalled();
      expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 480px)');
    });

    test('removes media query listener when element disconnects', async () => {
      const { mql } = mockMatchMedia(false);
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget .widgetKey=${WIDGET_KEY}></ia-zendesk-widget>`,
      );
      el.remove();
      expect(mql.removeEventListener).toHaveBeenCalled();
    });
  });
});
