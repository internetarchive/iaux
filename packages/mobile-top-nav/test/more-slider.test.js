import { html, fixture, expect } from '@open-wc/testing';
import '../src/more-slider';

describe('<more-slider>', () => {
  it('returns a baseUrl using this.config.baseURl', async () => {
    const config = {
      baseUrl: 'archive.org'
    };
    const el = await fixture(html`<more-slider .config=${config}>`);

    expect(el.baseUrl).to.contain(config.baseUrl);
  });
});
