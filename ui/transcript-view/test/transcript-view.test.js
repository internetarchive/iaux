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

  it('displays context zones if enabled', async () => {
    const el = await fixture(html`
      <transcript-view
        showContextZones='true'>
      </transcript-view>
    `);

    const contextZones = el.shadowRoot.querySelectorAll('.context-overlay');
    expect(contextZones.length).to.equal(2);
  });

  it('autoscroll button enables autoscroll', async () => {
    var scrollToClosestEntryCalled = false;

    const el = await fixture(html`
      <transcript-view>
      </transcript-view>
    `);

    el.scrollToClosestEntry = function() {
      scrollToClosestEntryCalled = true;
    }

    el.autoScroll = false;

    expect(el.autoScroll).to.equal(false);

    const autoScrollButton = el.shadowRoot.querySelector('.auto-scroll-button');
    const clickEvent = new MouseEvent('click');
    autoScrollButton.dispatchEvent(clickEvent);

    expect(el.autoScroll).to.equal(true);
    expect(scrollToClosestEntryCalled).to.equal(true);
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

    expect(durationFormatter.shadowRoot.innerHTML).to.have.string('1:09');
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
    const clickEvent = new MouseEvent('click');
    setTimeout(() => { entryToSelect.dispatchEvent(clickEvent); });
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

  it('changes the current entry when the id has changed', async () => {
    const entry1 = new TranscriptEntryConfig(1, 64, 67, 'foo', undefined);
    const entry2 = new TranscriptEntryConfig(2, 68, 73, 'bar', undefined);
    const entry3 = new TranscriptEntryConfig(3, 74, 78, 'baz', undefined);

    const config = new TranscriptConfig([entry1, entry2, entry3])

    const el = await fixture(html`
      <transcript-view
        .config=${config}
        currentTime='65'>
      </transcript-view>
    `);

    expect(el.currentEntries.length).to.equal(1);
    expect(el.currentEntries[0]).to.equal(entry1);

    setTimeout(() => { el.currentTime = 69; });
    const response = await oneEvent(el, 'currentEntriesUpdated');
    expect(response).to.exist;
    expect(el.currentEntries.length).to.equal(1);
    expect(el.currentEntries[0]).to.equal(entry2);
  });

  it('finds multiple current entries if they are active', async () => {
    const entry1 = new TranscriptEntryConfig(1, 64, 67, 'foo', undefined);
    const entry2 = new TranscriptEntryConfig(2, 68, 73, 'bar', undefined);
    const entry3 = new TranscriptEntryConfig(3, 74, 78, 'baz', undefined);
    const entry4 = new TranscriptEntryConfig(4, 74, 78, 'blop', undefined);
    const entry5 = new TranscriptEntryConfig(5, 79, 84, 'boop', undefined);

    const config = new TranscriptConfig([entry1, entry2, entry3, entry4, entry5]);

    const el = await fixture(html`
      <transcript-view
        .config=${config}
        currentTime='75'>
      </transcript-view>
    `);

    expect(el.currentEntries.length).to.equal(2);
    expect(el.currentEntries[0]).to.equal(entry3);
    expect(el.currentEntries[1]).to.equal(entry4);
  });

  it('returns null for closest id if there are no entries', async () => {
    const el = await fixture(html`
      <transcript-view>
      </transcript-view>
    `);

    const closestTime = el.entryIdentifierClosestToTime(65);
    expect(closestTime).to.be.null;
  });

  it('finds the id closest to a given time', async () => {
    const entry1 = new TranscriptEntryConfig(1, 64, 67, 'foo', undefined);
    const entry2 = new TranscriptEntryConfig(2, 68, 73, 'bar', undefined);
    const entry3 = new TranscriptEntryConfig(3, 74, 78, 'baz', undefined);

    const config = new TranscriptConfig([entry1, entry2, entry3])

    const el = await fixture(html`
      <transcript-view
        .config=${config}>
      </transcript-view>
    `);

    const closestTime = el.entryIdentifierClosestToTime(65);
    expect(closestTime).to.equal(1);

    const closestTime2 = el.entryIdentifierClosestToTime(68);
    expect(closestTime2).to.equal(2);
  });

  it('returns null for closest element if there are no entries', async () => {
    const el = await fixture(html`
      <transcript-view>
      </transcript-view>
    `);

    const closestTime = el.elementClosestToTime(65);
    expect(closestTime).to.be.null;
  });

});
