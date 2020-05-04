import { html, fixture, expect } from '@open-wc/testing';

import '../src/search-menu';

const component = html`<search-menu></search-menu>`;

describe('<search-menu>', () => {
  it('sets default properties', async () => {
    const searchMenu = await fixture(component);

    expect(searchMenu.searchMenuOpen).to.be.false;
    expect(searchMenu.searchMenuAnimate).to.be.false;
    expect(searchMenu.selectedSearchType).to.equal('');
  });

  it('sets selected search type', async () => {
    const searchMenu = await fixture(component);
    const value = 'text';

    searchMenu.selectSearchType({
      target: {
        value
      }
    });

    expect(searchMenu.selectedSearchType).to.equal(value);
  });

  it('renders with closed class if done animating', async () => {
    const searchMenu = await fixture(component);

    searchMenu.searchMenuAnimate = true;
    await searchMenu.updateComplete;

    expect(searchMenu.shadowRoot.querySelector('.search-menu').classList.contains('closed')).to.be.true;
  });
});
