import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import '../lib/transcript-entry';
import TranscriptEntryConfig from '../lib/models/transcript-entry-config';

function promisedSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('TranscriptEntry', () => {
  it('has no entry, nor is active or selected by default', async () => {
    const el = await fixture(html`
      <transcript-entry></transcript-entry>
    `);

    expect(el.entry).to.equal(undefined);
    expect(el.isActive).to.equal(false);
    expect(el.isSelected).to.equal(false);
  });

  it('displays entry text if provided', async () => {
    const entry = new TranscriptEntryConfig(1, 1, 2, 'foo-bar', undefined);

    const el = await fixture(html`
      <transcript-entry .entry=${entry}></transcript-entry>
    `);

    // el.entry = entry;

    // el.render();

    // await promisedSleep(1000);

    await elementUpdated(el)

    // const result = el.render();

    // el.entry = entry;

    console.log(el);

    expect(el).to.have.string('foo-bar');
  });
});
