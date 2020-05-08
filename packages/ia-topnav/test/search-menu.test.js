import { html, fixture, expect } from '@open-wc/testing';

import '../src/search-menu';

const component = html`<search-menu></search-menu>`;

describe('<search-menu>', () => {
  it('sets default properties', async () => {
    const el = await fixture(component);

    expect(el.searchMenuOpen).to.be.false;
    expect(el.searchMenuAnimate).to.be.false;
    expect(el.selectedSearchType).to.equal('');
  });

  it('sets selected search type', async () => {
    const el = await fixture(component);
    const value = 'text';

    el.selectSearchType({
      target: {
        value
      }
    });

    expect(el.selectedSearchType).to.equal(value);
  });

  it('renders with closed class if done animating', async () => {
    const el = await fixture(component);

    el.searchMenuAnimate = true;
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('.search-menu').classList.contains('closed')).to.be.true;
  });

  it('omits rendering of an option when hiddenSearchOptions has a value', async () => {
    const el = await fixture(component);
    const hiddenSearchOptions = ['WEB', 'RADIO'];

    el.config = { hiddenSearchOptions };
    await el.updateComplete;

    hiddenSearchOptions.forEach((value) => {
      expect(el.shadowRoot.querySelector(`[value=${value}]`)).to.equal(null);
    });
  });
});
