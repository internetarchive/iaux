import { html, fixture, expect } from '@open-wc/testing';

import '../src/primary-nav';

const component = ({
  baseHost, username, screenName, hideSearch
}) => (
  html`<primary-nav .baseHost=${baseHost} .username=${username} .screenName=${screenName} ?hideSearch=${hideSearch}></primary-nav>`
);

describe('<primary-nav>', () => {
  it('renders the login link when no username present', async () => {
    const el = await fixture(component({
      baseHost: 'archive.org',
      username: '',
    }));

    expect(el.shadowRoot.querySelector('login-button')).to.not.be.undefined;
  });

  it('does not render search menu toggle and search form if hideSearch true', async () => {
    const el = await fixture(component({
      baseHost: 'archive.org',
      username: 'shaneriley',
      screenName: 'shaneriley',
      hideSearch: true,
    }));

    expect(el.shadowRoot.querySelector('.search-trigger')).to.equal(null);
    expect(el.shadowRoot.querySelector('nav-search')).to.equal(null);
  });
});
