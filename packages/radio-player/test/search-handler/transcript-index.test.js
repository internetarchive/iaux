import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';
import { TranscriptIndex } from '../../lib/src/search-handler/transcript-index';

describe('Transcript Index', () => {
  it('correctly calculates entry start and end index offsets of the source transcript', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bang boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const transcriptIndex = new TranscriptIndex(transcriptConfig);

    const entryStartEndIndices = transcriptIndex.transcriptEntryRanges;

    // note a space is added between each transcript entry so it increases each
    // subsequent index by 1
    expect(entryStartEndIndices[0].entry).to.equal(entry1);
    expect(entryStartEndIndices[0].range.startIndex).to.equal(0);
    expect(entryStartEndIndices[0].range.endIndex).to.equal(11);

    expect(entryStartEndIndices[1].entry).to.equal(entry2);
    expect(entryStartEndIndices[1].range.startIndex).to.equal(12);
    expect(entryStartEndIndices[1].range.endIndex).to.equal(21);

    expect(entryStartEndIndices[2].entry).to.equal(entry3);
    expect(entryStartEndIndices[2].range.startIndex).to.equal(22);
    expect(entryStartEndIndices[2].range.endIndex).to.equal(32);
  });

  it('correctly builds the full text blob', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bang boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const transcriptIndex = new TranscriptIndex(transcriptConfig);

    expect(transcriptIndex.mergedTranscript).to.equal('foo bar baz boop blop bang boing');
  });

  it('correctly finds the correct entry range for a given index', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump baz boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const transcriptIndex = new TranscriptIndex(transcriptConfig);

    // in second entry
    const transcriptEntryRange = transcriptIndex.getTranscriptEntryAt(14);
    expect(transcriptEntryRange.entry).to.equal(entry2);

    // in third entry
    const transcriptEntryRange2 = transcriptIndex.getTranscriptEntryAt(23);
    expect(transcriptEntryRange2.entry).to.equal(entry3);

    // in-between the first and second entry
    const transcriptEntryRange3 = transcriptIndex.getTranscriptEntryAt(11);
    expect(transcriptEntryRange3).to.equal(undefined);

    // outside of range
    const transcriptEntryRange4 = transcriptIndex.getTranscriptEntryAt(45);
    expect(transcriptEntryRange4).to.equal(undefined);
  });
});
