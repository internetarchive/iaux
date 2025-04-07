import { html, fixture, expect } from '@open-wc/testing';
import '../../../src/assets/img/hamburger';

describe('<icon-hamburger>', () => {
  it('toggles close icon when property toggled', async () => {
    const icon = await fixture(html`<icon-hamburger></icon-hamburger>`);

    icon.active = true;
    await icon.updateComplete;

    const titleElement = icon.shadowRoot.querySelector('svg title');

    expect(titleElement.getAttribute('id')).to.match(/close/);
  });
});
