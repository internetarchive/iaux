import { html, fixture, expect } from '@open-wc/testing';
import '../src/login-button';
import { LoginButton } from '../src/login-button';

const component = html`<login-button></login-button>`;

describe('<login-button>', () => {
  it('toggles active class when avatar clicked', async () => {
    const el = await fixture<LoginButton>(component);
    const toggle = el.shadowRoot?.querySelector(
      '.dropdown-toggle',
    ) as HTMLAnchorElement;

    toggle?.click();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.active')).to.not.be.undefined;
  });
});
