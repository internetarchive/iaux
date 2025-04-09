import { html, fixture, expect } from '@open-wc/testing';

import '../src/search-menu';
import { SearchMenu } from '../src/search-menu';

const component = html`<search-menu></search-menu>`;

describe('<search-menu>', () => {
  it('sets default properties', async () => {
    const el = await fixture<SearchMenu>(component);

    expect(el.searchMenuOpen).to.be.false;
    expect(el.searchMenuAnimate).to.be.false;
    expect(el.selectedSearchType).to.equal('');
  });

  it('sets selected search type', async () => {
    const el = await fixture<SearchMenu>(component);
    const value = 'text';

    const inputEvent = new InputEvent('input');
    Object.defineProperty(inputEvent, 'target', {
      value: {
        value,
      },
      writable: false,
    });

    el.selectSearchType(inputEvent);

    expect(el.selectedSearchType).to.equal(value);
  });

  it('renders with closed class if done animating', async () => {
    const el = await fixture<SearchMenu>(component);

    el.searchMenuAnimate = true;
    await el.updateComplete;

    expect(
      el.shadowRoot
        ?.querySelector('.search-menu-inner')
        ?.classList.contains('closed'),
    ).to.be.true;
  });

  it('omits rendering of an option when hiddenSearchOptions has a value', async () => {
    const el = await fixture<SearchMenu>(component);
    const hiddenSearchOptions = ['WEB', 'RADIO'];

    el.config = { hiddenSearchOptions };
    await el.updateComplete;

    hiddenSearchOptions.forEach((value) => {
      expect(el.shadowRoot?.querySelector(`[value=${value}]`)).to.equal(null);
    });
  });
});
