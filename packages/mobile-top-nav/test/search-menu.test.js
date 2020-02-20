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
});
