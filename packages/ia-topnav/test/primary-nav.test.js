import {
  html, fixture, expect, fixtureCleanup, elementUpdated
} from '@open-wc/testing';

import '../src/primary-nav';

const component = ({
  baseHost, username, screenName, hideSearch, config = {}
}) => (
  html`<primary-nav .baseHost=${baseHost} .username=${username} .screenName=${screenName} ?hideSearch=${hideSearch} .config=${config}></primary-nav>`
);

afterEach(() => {
  fixtureCleanup();
});

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

  it('truncates a long screenname', async () => {
    const el = await fixture(component({
      baseHost: 'archive.org',
      username: 'boop',
      screenName: 'somesuperlongscreenname'
    }));

    const usernameSpan = el.shadowRoot.querySelector('.username');

    expect(usernameSpan.innerText).to.equal('somesuper…');
  });

  it('opens a slot if config as `secondIdentitySlot`', async () => {
    const el = await fixture(component({
      baseHost: 'archive.org',
      username: 'boop',
      screenName: 'somesuperlongscreenname',
      config: {
        secondIdentitySlot: 'allow'
      }
    }));

    const slot = el.shadowRoot.querySelector('div.branding').querySelector('slot');
    expect(slot).to.exist;
    expect(slot.getAttribute('name')).to.equal('opt-sec-logo');


    el.config = { secondIdentitySlot: '' };
    await elementUpdated(el);
    const noSlot = el.shadowRoot.querySelector('div.branding').querySelector('slot');
    expect(noSlot).to.not.exist;
  });
});
