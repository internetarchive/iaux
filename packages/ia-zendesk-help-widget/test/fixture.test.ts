import axe from 'axe-core';
import { html } from 'lit';
import { describe, expect, it } from 'vitest';

import '../src/your-webcomponent';
import type { YourWebComponent } from '../src/your-webcomponent';
import { fixture } from './fixture';

describe('fixture', () => {
  it('returns the rendered element', async () => {
    const el = await fixture<HTMLDivElement>(html`<div>hello</div>`);

    expect(el).toBeInstanceOf(HTMLDivElement);
    expect(el.textContent).toBe('hello');
  });

  it('appends the element to document.body', async () => {
    const el = await fixture<HTMLDivElement>(html`<div>in the DOM</div>`);

    expect(document.body.contains(el)).toBe(true);
  });

  it('awaits updateComplete for Lit elements', async () => {
    const el = await fixture<YourWebComponent>(
      html`<your-webcomponent></your-webcomponent>`,
    );

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.querySelector('h2')).toBeTruthy();
  });

  it('works with plain HTML elements that lack updateComplete', async () => {
    const el = await fixture<HTMLSpanElement>(html`<span>plain</span>`);

    expect(el).toBeInstanceOf(HTMLSpanElement);
    expect(el.textContent).toBe('plain');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<HTMLDivElement>(html`<div>accessible</div>`);

    const results = await axe.run(el);
    expect(results.violations).toEqual([]);
  });
});
