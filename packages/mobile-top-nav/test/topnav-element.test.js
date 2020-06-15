import {
  html,
  fixture,
  expect,
  oneEvent,
} from '@open-wc/testing';
import { LitElement } from 'lit-element';

import '../src/topnav-element';

const container = html`<topnav-element></topnav-element>`;

customElements.define('test-search-form', class extends LitElement {
  render() {
    return html`<form><input name="query"><input name="sin" value="TXT"></form>`;
  }
});

describe('<topnav-element>', () => {
  it('defaults all menus to closed and not animating', async () => {
    const topnavElement = await fixture(container);

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
      const el = await fixture(container);

      el[`${menuType}Menu`]();

      expect(el[`${menuType}MenuAnimate`]).to.be.true;
      expect(el[`${menuType}MenuOpen`]).to.be.true;
    });
  });

  it('toggles search menu open and animating', async () => {
    const el = await fixture(container);

    el.searchMenu();

    expect(el.searchMenuAnimate).to.be.true;
    expect(el.searchMenuFade).to.be.true;
    expect(el.searchMenuOpen).to.be.true;
  });

  it('does not allow search form to submit if query empty', async () => {
    const el = await fixture(container);
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
    const el = await fixture(container);
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

  it('dispatches an analyticsClick event when trackClick event fired', async () => {
    const el = await fixture(container);
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

  it('dispatches an analyticsSubmit event when trackSubmit event fired', async () => {
    const el = await fixture(container);
    const submitEvent = new Event('submit');

    setTimeout(() => (
      el
        .shadowRoot
        .querySelector('mobile-nav')
        .shadowRoot
        .querySelector('nav-search')
        .shadowRoot
        .querySelector('form')
        .dispatchEvent(submitEvent)
    ));
    const response = await oneEvent(el, 'trackSubmit');

    expect(response).to.exist;
  });

  it('closes all menus when close-layer clicked', async () => {
    const el = await fixture(container);
    const menus = ['media', 'search', 'user'];

    menus.forEach((menu) => {
      el[`${menu}MenuOpen`] = true;
    });

    await el.updateComplete;
    el.closeMenus();
    await el.updateComplete;

    menus.forEach((menu) => {
      expect(el[`${menu}MenuOpen`]).to.be.false;
    });
  });
});
