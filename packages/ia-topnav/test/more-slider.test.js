import { html, fixture, expect } from '@open-wc/testing';
import '../src/more-slider';
import { more } from '../src/data/menus';

describe('<more-slider>', () => {
  it('renders links with relative hrefs using baseHost', async () => {
    const baseHost = 'archive.org';
    const el = await fixture(html`<more-slider .baseHost=${baseHost} .config=${{}} .menuItems=${more}>`);

    expect(el.shadowRoot.querySelector('a').getAttribute('href')).to.contain(baseHost);
  });
});
