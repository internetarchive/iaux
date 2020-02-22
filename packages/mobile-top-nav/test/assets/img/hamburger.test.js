import { html, fixture, expect } from '@open-wc/testing';
import '../../../src/assets/img/hamburger';

describe('<icon-hamburger>', () => {
  it('toggles active class when property toggled', async () => {
    const icon = await fixture(html`<icon-hamburger></icon-hamburger>`);

    icon.active = true;
    await icon.updateComplete;

    const styleElement = icon.shadowRoot.querySelector('svg');
    console.log(icon.shadowRoot);

    expect(styleElement.classList.contains('active')).to.be.true;
  });
});
