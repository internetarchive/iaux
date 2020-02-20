import { html, fixture, expect } from '@open-wc/testing';

import '../src/user-menu';

const component = html`<user-menu></user-menu>`;

describe('<user-menu>', () => {
  it('sets default properties', async () => {
    const userMenu = await fixture(component);

    expect(userMenu.userMenuOpen).to.be.false;
    expect(userMenu.userMenuAnimate).to.be.false;
  });
});
