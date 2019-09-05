import { html, fixture, expect } from '@open-wc/testing';

import '../scrubber-bar';

describe('ScrubberBar', () => {
  it('defaults to 0 percent complete', async () => {
    const el = await fixture(html`
      <scrubber-bar></scrubber-bar>
    `);

    expect(el.percentComplete).to.equal(0);
  });
});
