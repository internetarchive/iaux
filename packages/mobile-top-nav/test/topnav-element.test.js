import {
  html,
  fixture,
  expect,
  oneEvent,
} from '@open-wc/testing';
import { LitElement } from 'lit-element';

import '../src/topnav-element';

customElements.define('test-search-form', class extends LitElement {
  render() {
    return html`<form><input name="query"><input name="sin" value="TXT"></form>`;
  }
});

describe('<topnav-element>', () => {
  it('defaults all menus to closed and not animating', async () => {
    const topnavElement = await fixture(html`<topnav-element></topnav-element>`);

    [
      'userMenuOpen',
      'userMenuAnimate',
      'searchMenuOpen',
      'searchMenuAnimate',
      'mediaMenuOpen',
      'mediaMenuAnimate',
    ].forEach((prop) => {
      expect(topnavElement[prop]).to.be.false;
    });
  });

  ['media', 'user'].forEach((menuType) => {
    it(`toggles ${menuType} menu open and animating`, async () => {
      const el = await fixture(html`<topnav-element></topnav-element>`);

      el[`${menuType}Menu`]();

      expect(el[`${menuType}MenuAnimate`]).to.be.true;
      expect(el[`${menuType}MenuOpen`]).to.be.true;
    });
  });

  it('toggles search menu open and animating', async () => {
    const el = await fixture(html`<topnav-element></topnav-element>`);

    el.searchMenu();

    expect(el.searchMenuAnimate).to.be.true;
    expect(el.searchMenuFade).to.be.true;
    expect(el.searchMenuOpen).to.be.true;
  });

  it('does not allow search form to submit if query empty', async () => {
    const el = await fixture(html`<topnav-element></topnav-element>`);
    const searchForm = await fixture(html`<test-search-form></test-search-form>`);
    const formEl = searchForm.shadowRoot.querySelector('form');

    const result = el.navSearch({
      detail: {
        originalEvent: { preventDefault: () => {} },
        formEl,
      }
    });

    expect(result).to.be.false;
  });

  it('assigns a value to "search in" field in search form', async () => {
    const el = await fixture(html`<topnav-element></topnav-element>`);
    const searchForm = await fixture(html`<test-search-form></test-search-form>`);
    const formEl = searchForm.shadowRoot.querySelector('form');

    formEl.querySelector('[name=query]').value = 'atari';
    const result = el.navSearch({
      detail: {
        originalEvent: { preventDefault: () => {} },
        formEl,
      }
    });

    expect(result).to.be.true;
    expect(formEl.querySelector('[name=sin]').value).to.equal('');
  });

  it('dispatches an analyticsClick event when trackSubmit event fired', async () => {
    const el = await fixture(html`<topnav-element></topnav-element>`);
    const clickEvent = new MouseEvent('click');

    setTimeout(() => (
      el
        .shadowRoot
        .querySelector('mobile-nav')
        .shadowRoot
        .querySelector('.hamburger')
        .dispatchEvent(clickEvent)
    ));
    const response = await oneEvent(el, 'trackClick');

    expect(response).to.exist;
  });
});
