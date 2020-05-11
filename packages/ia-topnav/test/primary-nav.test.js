import { html, fixture, expect } from '@open-wc/testing';

import '../src/primary-nav';

const config = {
  baseHost: 'archive.org',
  username: 'shaneriley',
};

const component = () => (
  html`<primary-nav .config=${config}></primary-nav>`
);

describe('<primary-nav>', () => {
  it('renders the login link when no username present', async () => {
    config.username = '';
    const el = await fixture(component());

    expect(el.shadowRoot.querySelector('login-button')).to.not.be.undefined;
  });
});
