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
});
