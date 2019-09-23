import {
  html, fixture, expect, oneEvent
} from '@open-wc/testing';

import '../transcript-view';

describe('TranscriptView', () => {
  it('has no entries by default', async () => {
    const el = await fixture(html`
      <transcript-view></transcript-view>
    `);

    expect(el.entries.length).to.equal(0);
  });
});
