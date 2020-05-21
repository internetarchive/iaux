import { fixture, expect, html } from '@open-wc/testing';

import '../index';

describe('<ia-icon>', () => {
  it('renders an empty element when icon type is unrecognized', async () => {
    const el = await fixture(html`<ia-icon icon="foo"></ia-icon>`);

    expect(el.shadowRoot.querySelector('svg')).to.equal(null);
  });

  it('renders an icon', async () => {
    const el = await fixture(html`<ia-icon icon="web"></ia-icon>`);

    expect(el.shadowRoot.querySelector('svg')).to.exist;
  });

  it('sets a fill attribute on the icon\'s SVG objects', async () => {
    const fillColor = '#ccc';
    const el = await fixture(html`<ia-icon icon="web" fill=${fillColor}></ia-icon>`);

    el.shadowRoot.querySelectorAll('.fill-color').forEach((node) => {
      expect(node.getAttribute('fill')).to.equal(fillColor);
    });
  });

  it('sets a stroke color attribute on the icon\'s SVG objects', async () => {
    const strokeColor = '#333';
    const el = await fixture(html`<ia-icon icon="advance" stroke=${strokeColor}></ia-icon>`);

    el.shadowRoot.querySelectorAll('.stroke-color').forEach((node) => {
      expect(node.getAttribute('stroke')).to.equal(strokeColor);
    });
  });
});
