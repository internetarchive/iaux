import { html, fixture, expect } from '@open-wc/testing';

import '../src/user-menu';

const component = html`<user-menu></user-menu>`;

describe('<user-menu>', () => {
  it('sets default properties', async () => {
    const userMenu = await fixture(component);

    expect(userMenu.userMenuOpen).to.be.false;
    expect(userMenu.userMenuAnimate).to.be.false;
  });

  it('renders with closed class if done animating', async () => {
    const userMenu = await fixture(component);

    userMenu.userMenuAnimate = true;
    await userMenu.updateComplete;

    expect(userMenu.shadowRoot.querySelector('nav').classList.contains('closed')).to.be.true;
  });
});
