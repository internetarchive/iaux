import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import '../lib/src/radio-player';

describe('Radio Player', () => {
  it('has no configuration', async () => {
    const el = await fixture(html`
      <radio-player></radio-player>
    `);

    expect(el.config).to.equal(undefined);
  });
});
