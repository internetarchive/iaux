import { html, fixture, expect } from '@open-wc/testing';
import '../src/example-component';

describe('TrackedElement', () => {
  it('fires click and submit events when button clicked', async () => {
    const el = await fixture(html`<example-component></example-component>`);
    let clickFired = false;
    let submitFired = false;

    el.addEventListener('trackClick', () => {
      clickFired = true;
    });

    el.addEventListener('trackSubmit', () => {
      submitFired = true;
    });

    setTimeout(el.shadowRoot.querySelector('button').click());
    expect(clickFired).to.be.true;
    expect(submitFired).to.be.true;
  });
});
