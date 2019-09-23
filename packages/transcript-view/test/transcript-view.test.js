import {
  html, fixture, expect, oneEvent
} from '@open-wc/testing';

import '../transcript-view';
import TranscriptEntryConfig from '../lib/models/transcript-entry-config';

describe('TranscriptView', () => {
  it('has no entries by default', async () => {
    const el = await fixture(html`
      <transcript-view></transcript-view>
    `);

    expect(el.entries.length).to.equal(0);
  });

  it('displays the current timestamp via the duration formatter', async () => {
    const entry1 = new TranscriptEntryConfig(1, 64, 67, 'foo', undefined);
    const entry2 = new TranscriptEntryConfig(2, 67, 73, 'bar', undefined);
    const entry3 = new TranscriptEntryConfig(3, 73, 78, 'baz', undefined);

    const el = await fixture(html`
      <transcript-view
        .entries=${[entry1, entry2, entry3]}
        .currentEntry=${entry2}>
      </transcript-view>
    `);

    const durationFormatter = el.shadowRoot.querySelector('duration-formatter');

    expect(durationFormatter.shadowRoot.innerHTML).to.have.string('01:07');
  });

  it('emits a `transcriptEntrySelected` event when the user clicks on a transcript entry', async () => {
    const entry1 = new TranscriptEntryConfig(1, 64, 67, 'foo', undefined);
    const entry2 = new TranscriptEntryConfig(2, 67, 73, 'bar', 1);
    const entry3 = new TranscriptEntryConfig(3, 73, 78, 'baz', undefined);

    const el = await fixture(html`
      <transcript-view
        .entries=${[entry1, entry2, entry3]}
        .currentEntry=${entry2}>
      </transcript-view>
    `);

    const entryToSelect = el.shadowRoot.querySelectorAll('transcript-entry')[1];
    const spanToClick = entryToSelect.shadowRoot.querySelector('span');

    const clickEvent = new MouseEvent('click');
    setTimeout(() => { spanToClick.dispatchEvent(clickEvent); });
    const response = await oneEvent(el, 'transcriptEntrySelected');
    expect(response).to.exist;
  });

});
