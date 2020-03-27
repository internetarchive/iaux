import { html, fixture, expect } from '@open-wc/testing';

import '../ia-activity-indicator.js';
import { IAActivityIndicatorMode } from '../index.js';

describe('IA Activity Indicator', () => {
  it('has a single container element', async () => {
    const el = await fixture(html`
      <ia-activity-indicator></ia-activity-indicator>
    `);
    const container = el.shadowRoot.querySelectorAll('div');
    expect(container.length).to.equal(1);
  });

  it('container element has default class', async () => {
    const el = await fixture(html`
      <ia-activity-indicator></ia-activity-indicator>
    `);
    const container = el.shadowRoot.querySelector('div');
    expect(container.classList.contains(IAActivityIndicatorMode.processing)).to.be.true;
  });

  it('container element class changes when mode changes', async () => {
    const el = await fixture(html`
      <ia-activity-indicator></ia-activity-indicator>
    `);
    const container = el.shadowRoot.querySelector('div');
    expect(container.classList.contains(IAActivityIndicatorMode.processing)).to.be.true;
    el.mode = IAActivityIndicatorMode.complete;
    await el.updateComplete;
    expect(container.classList.contains(IAActivityIndicatorMode.processing)).to.be.false;
    expect(container.classList.contains(IAActivityIndicatorMode.complete)).to.be.true;
  });
});
