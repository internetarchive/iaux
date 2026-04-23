import {
  html,
  fixture,
  expect,
  oneEvent,
  fixtureCleanup,
  elementUpdated,
} from '@open-wc/testing';

import '../src/ia-topnav';
import { IATopNav } from '../src/ia-topnav';
import { SignedOutDropdown } from '../src/signed-out-dropdown';
import UserMenu from '../src/user-menu';

const verifyClosed = (instance: IATopNav) => {
  expect(instance.mediaSliderOpen).to.be.false;
  expect(instance.selectedMenuOption).to.equal('');
};

const verifyOpened = (instance: IATopNav, mediatype: string) => {
  expect(instance.mediaSliderOpen).to.be.true;
  expect(instance.selectedMenuOption).to.equal(mediatype);
};

afterEach(() => {
  fixtureCleanup();
});

describe('<ia-topnav>', () => {
  it('dispatches an analyticsClick event when trackClick event fired', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    const clickEvent = new MouseEvent('click');

    setTimeout(() =>
      el.shadowRoot
        ?.querySelector('primary-nav')
        ?.shadowRoot?.querySelector('.hamburger')
        ?.dispatchEvent(clickEvent),
    );
    const response = await oneEvent(el, 'trackClick');

    expect(response).to.exist;
  });

  it('closes all menus when close-layer clicked', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);

    el.openMenu = 'media';
    el.selectedMenuOption = 'texts';
    el.mediaSliderOpen = true;
    await el.updateComplete;
    el.closeMenus();
    await el.updateComplete;

    expect(el.mediaSliderOpen).to.be.false;
    expect(el.openMenu).to.equal('');
    expect(el.selectedMenuOption).to.equal('');
  });

  it('sets media slider to closed', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);

    el.mediaSliderOpen = true;
    el.selectedMenuOption = 'foo';
    el.closeMediaSlider();

    verifyClosed(el);
  });

  it('toggles media slider visibility and starts animation', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    const mediatype = 'foo';

    el.selectedMenuOption = mediatype;
    el.openMediaSlider();

    verifyOpened(el, mediatype);
  });

  it('closes media slider if selected menu type is the open menu type', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    const mediatype = 'foo';

    el.selectedMenuOption = mediatype;

    const event = new CustomEvent('mediaTypeSelected', {
      detail: {
        mediatype,
      },
    });

    el.mediaTypeSelected(event);

    verifyClosed(el);
  });

  it('opens media slider menu and starts animation', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    const mediatype = 'foo';

    const event = new CustomEvent('mediaTypeSelected', {
      detail: {
        mediatype,
      },
    });

    el.mediaTypeSelected(event);

    verifyOpened(el, mediatype);
  });

  it('closes slider when menu closed', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);

    el.openMenu = 'media';
    el.selectedMenuOption = 'foo';
    el.mediaSliderOpen = true;
    await el.updateComplete;

    const event = new CustomEvent('menuToggled', {
      detail: {
        menuName: '',
      },
    });

    el.menuToggled(event);
    await el.updateComplete;

    expect(el.selectedMenuOption).to.equal('');
  });

  it('toggles user menu tabindex when dropdown open', async () => {
    const el = await fixture<IATopNav>(
      html` <ia-topnav username="shaneriley" ?localLinks=${false}></ia-topnav>`,
    );

    el.openMenu = 'user';
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector('user-menu')?.getAttribute('tabindex'),
    ).to.equal('');
  });

  it('toggles signed out menu tabindex when dropdown open', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);

    el.openMenu = 'login';
    await el.updateComplete;

    expect(
      el.shadowRoot
        ?.querySelector('signed-out-dropdown')
        ?.getAttribute('tabindex'),
    ).to.equal('');
  });

  it('toggles search menu when search toggle button clicked', async () => {
    const el = await fixture<IATopNav>(html` <ia-topnav></ia-topnav>`);
    (
      el.shadowRoot
        ?.querySelector('primary-nav')
        ?.shadowRoot?.querySelector('.search-trigger') as HTMLButtonElement
    ).click();
    await el.updateComplete;

    expect(el.openMenu).to.equal('search');
  });

  it('toggles user menu when search user avatar clicked', async () => {
    const el = await fixture<IATopNav>(
      html` <ia-topnav
        username="shaneriley"
        screenName="shaneriley"
        ?localLinks=${false}
      ></ia-topnav>`,
    );

    (
      el.shadowRoot
        ?.querySelector('primary-nav')
        ?.shadowRoot?.querySelector('.user-menu') as HTMLButtonElement
    ).click();
    await el.updateComplete;

    expect(el.openMenu).to.equal('user');
  });

  it('uses localLinks for archive.org logo link', async () => {
    const el = await fixture<IATopNav>(
      html` <ia-topnav ?localLinks=${false}></ia-topnav>`,
    );
    const logoLink = el.shadowRoot
      ?.querySelector('primary-nav')
      ?.shadowRoot?.querySelector('.link-home');
    expect(logoLink?.getAttribute('href')).to.match(/\/\/archive\.org/);
  });

  describe('sets localLinks properly', async () => {
    it('uses localLinks to archive.org links on common child components', async () => {
      const el = await fixture<IATopNav>(
        html` <ia-topnav ?localLinks=${false}></ia-topnav>`,
      );
      const componentSelectors = [
        'primary-nav',
        'media-slider',
        'desktop-subnav',
      ];
      componentSelectors.forEach((selector) => {
        const component = el.shadowRoot?.querySelector(selector) as unknown as {
          baseHost: string;
        };
        expect(component?.baseHost).to.equal('https://archive.org');
      });
    });

    it('uses localLinks to archive.org links on the signed out dropdown', async () => {
      const el = await fixture<IATopNav>(
        html` <ia-topnav ?localLinks=${false}></ia-topnav>`,
      );
      const signedOutDropdown = el.shadowRoot?.querySelector(
        'signed-out-dropdown',
      ) as SignedOutDropdown;
      expect(signedOutDropdown?.baseHost).to.equal('https://archive.org');
    });

    it('uses localLinks to archive.org links on the user dropdown', async () => {
      const el = await fixture<IATopNav>(
        html` <ia-topnav username="foopey" ?localLinks=${false}></ia-topnav>`,
      );
      const signedOutDropdown = el.shadowRoot?.querySelector(
        'user-menu',
      ) as UserMenu;
      expect(signedOutDropdown.baseHost).to.equal('https://archive.org');
    });
  });

  describe('search slot', () => {
    it('forwards search slot to primary-nav', async () => {
      const el = await fixture<IATopNav>(html`<ia-topnav></ia-topnav>`);
      await el.updateComplete;

      const primaryNav = el.shadowRoot?.querySelector('primary-nav');
      const slot = primaryNav?.querySelector('slot[name="search"]');
      expect(slot).to.exist;
    });

    it('does not render search-menu', async () => {
      const el = await fixture<IATopNav>(html`<ia-topnav></ia-topnav>`);
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('search-menu')).to.not.exist;
    });
  });

  describe('slot pass throughs', () => {
    describe('slot for <primary-nav>', () => {
      it('opens a slot with `secondIdentitySlotMode`', async () => {
        const el = await fixture<IATopNav>(
          html`<ia-topnav
            ?localLinks=${false}
            username="boop"
            screenName="somesuperlongscreenname"
            secondIdentitySlotMode="allow"
          ></ia-topnav>`,
        );

        const slot = el.shadowRoot
          ?.querySelector('primary-nav')
          ?.querySelector('slot[name="opt-sec-logo"]');
        expect(slot).to.exist;

        el.secondIdentitySlotMode = '';
        await elementUpdated(el);
        const noSlot = el.shadowRoot
          ?.querySelector('primary-nav')
          ?.querySelector('slot[name="opt-sec-logo"]');
        expect(noSlot).to.not.exist;
      });
    });
  });
});
