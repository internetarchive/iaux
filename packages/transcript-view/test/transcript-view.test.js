import {
  html, fixture, expect, oneEvent
} from '@open-wc/testing';

import promisedSleep from './promised-sleep';
import '../lib/src/transcript-view';
import TranscriptEntryConfig from '../lib/src/models/transcript-entry-config';
import TranscriptConfig from '../lib/src/models/transcript-config';

describe('TranscriptView', () => {
  it('has no entries by default', async () => {
    const el = await fixture(html`
      <transcript-view></transcript-view>
    `);

    expect(el.config).to.equal(undefined);
  });

  it('displays the current timestamp via the duration formatter', async () => {
    const entry1 = new TranscriptEntryConfig(1, 64, 67, 'foo', false);
    const entry2 = new TranscriptEntryConfig(2, 68, 73, 'bar', false);
    const entry3 = new TranscriptEntryConfig(3, 74, 78, 'baz', false);

    const config = new TranscriptConfig([entry1, entry2, entry3])

    const el = await fixture(html`
      <transcript-view
        .config=${config}
        currentTime=69>
      </transcript-view>
    `);

    const durationFormatter = el.shadowRoot.querySelector('duration-formatter');

    expect(durationFormatter.shadowRoot.innerHTML).to.have.string('01:08');
  });

  it('emits a `transcriptEntrySelected` event when the user clicks on a transcript entry', async () => {
    const entry1 = new TranscriptEntryConfig(1, 64, 67, 'foo', false, undefined);
    const entry2 = new TranscriptEntryConfig(2, 68, 73, 'bar', false, 1);
    const entry3 = new TranscriptEntryConfig(3, 74, 78, 'baz', false, undefined);

    const config = new TranscriptConfig([entry1, entry2, entry3])

    const el = await fixture(html`
      <transcript-view
        .config=${config}
        currentTime=70>
      </transcript-view>
    `);

    const entryToSelect = el.shadowRoot.querySelectorAll('transcript-entry')[1];
    const spanToClick = entryToSelect.shadowRoot.querySelector('span');

    const clickEvent = new MouseEvent('click');
    setTimeout(() => { spanToClick.dispatchEvent(clickEvent); });
    const response = await oneEvent(el, 'transcriptEntrySelected');
    expect(response).to.exist;
  });

  it('disables `autoScroll` if the user scrolls and reenables it after `scrollTimerDelay`', async () => {
    const entry1 = new TranscriptEntryConfig(1, 64, 67, 'foo', undefined);
    const entry2 = new TranscriptEntryConfig(2, 67, 73, 'bar', undefined);
    const entry3 = new TranscriptEntryConfig(3, 73, 78, 'baz', undefined);

    const config = new TranscriptConfig([entry1, entry2, entry3])

    const el = await fixture(html`
      <transcript-view
        .config=${config}
        .currentEntry=${entry2}>
      </transcript-view>
    `);

    el.scrollTimerDelay = 50;

    const scrollContainer = el.shadowRoot.querySelector('.scroll-container');
    const wheelEvent = new MouseEvent('wheel');
    scrollContainer.dispatchEvent(wheelEvent);

    expect(el.autoScroll).to.equal(false);

    await promisedSleep(55);

    expect(el.autoScroll).to.equal(true);
  });

});
