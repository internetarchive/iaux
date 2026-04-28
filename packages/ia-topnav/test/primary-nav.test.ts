import {
  html,
  fixture,
  expect,
  fixtureCleanup,
  elementUpdated,
} from '@open-wc/testing';

import '../src/primary-nav';
import { IATopNavConfig, IATopNavSecondIdentitySlotMode } from '../src/models';
import { PrimaryNav } from '../src/primary-nav';

const component = ({
  baseHost = 'archive.org',
  username = '',
  screenName = '',
  hideSearch = false,
  config = {},
  secondIdentitySlotMode = 'allow',
}: {
  baseHost?: string;
  username?: string;
  screenName?: string;
  hideSearch?: boolean;
  config?: IATopNavConfig;
  secondIdentitySlotMode?: IATopNavSecondIdentitySlotMode;
}) =>
  html` <primary-nav
    .baseHost=${baseHost}
    .username=${username}
    .screenName=${screenName}
    ?hideSearch=${hideSearch}
    .config=${config}
    .secondIdentitySlotMode=${secondIdentitySlotMode}
  ></primary-nav>`;

afterEach(() => {
  fixtureCleanup();
});

describe('<primary-nav>', () => {
  it('renders the login link when no username present', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: '',
      }),
    );

    expect(el.shadowRoot?.querySelector('login-button')).to.not.be.undefined;
  });

  it('does not render search trigger or search slot if hideSearch true', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: 'shaneriley',
        screenName: 'shaneriley',
        hideSearch: true,
      }),
    );

    expect(el.shadowRoot?.querySelector('.search-trigger')).to.equal(null);
    expect(el.shadowRoot?.querySelector('.search-container')).to.not.exist;
  });

  it('renders search slot container', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: 'testuser',
        screenName: 'testuser',
      }),
    );

    expect(el.shadowRoot?.querySelector('.search-container')).to.exist;

    const slot = el.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="search"]',
    );
    expect(slot).to.exist;
  });

  it('renders search trigger button for mobile toggle', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: 'testuser',
        screenName: 'testuser',
      }),
    );

    expect(el.shadowRoot?.querySelector('.search-trigger')).to.exist;
  });

  it('does not render nav-search', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: 'testuser',
        screenName: 'testuser',
      }),
    );

    expect(el.shadowRoot?.querySelector('nav-search')).to.not.exist;
  });

  it('opens a slot with `secondIdentitySlotMode`', async () => {
    const el = await fixture<PrimaryNav>(
      component({
        baseHost: 'archive.org',
        username: 'boop',
        screenName: 'somesuperlongscreenname',
        secondIdentitySlotMode: 'allow',
      }),
    );

    const brandingBlock = el.shadowRoot?.querySelector('div.branding');
    expect(brandingBlock?.getAttribute('class')).to.contain(
      'branding second-logo',
    );

    const slot = brandingBlock?.querySelector('slot');
    expect(slot).to.exist;
    expect(slot?.getAttribute('name')).to.equal('opt-sec-logo');

    el.secondIdentitySlotMode = '';
    await elementUpdated(el);
    const noSlotBrandingBlock = el.shadowRoot?.querySelector('div.branding');
    expect(noSlotBrandingBlock?.getAttribute('class')).to.contain('branding');

    const noSlot = noSlotBrandingBlock?.querySelector('slot');
    expect(noSlot).to.not.exist;
  });
});
