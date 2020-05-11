import { html, fixture, expect } from '@open-wc/testing';
import '../src/more-slider';

describe('<more-slider>', () => {
  it('returns a baseUrl using this.config.baseHost', async () => {
    const config = {
      baseHost: 'archive.org'
    };
    const el = await fixture(html`<more-slider .config=${config}>`);

    expect(el.baseUrl).to.contain(config.baseHost);
  });
});
