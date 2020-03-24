import { html, fixture, expect } from '@open-wc/testing';

import '../src/example-webcomponent';

const component = html`<hello-component>`;

describe('<hello-component>', () => {
  it('sets default properties', async () => {
    const el = await fixture(component);

    expect(el.name).to.equal('World');
    expect(el.toggled).to.be.false;
  });

  it('toggles state when button clicked', async () => {
    const el = await fixture(component);

    el.toggleColor();
    await el.updateComplete;

    expect(el.toggled).to.be.true;
  });
});
