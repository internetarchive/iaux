import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import { TranscriptConfig, TranscriptEntryConfig } from "@internetarchive/transcript-view";
import { SearchIndex } from '../../lib/src/search-handler/search-index';

describe('Search Index', () => {
  it('correctly calculates entry start and end index offsets of the source transcript', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bang boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const searchIndex = new SearchIndex(transcriptConfig);

    const entryStartEndIndices = searchIndex.transcriptEntryRanges;

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
    const searchIndex = new SearchIndex(transcriptConfig);

    expect(searchIndex.mergedTranscript).to.equal('foo bar baz boop blop bang boing');
  });

  it('correctly finds search indices', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump baz boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const searchIndex = new SearchIndex(transcriptConfig);

    const searchIndices = searchIndex.getSearchIndices('baz');

    expect(searchIndices).to.deep.equal([8, 27]);
  });
});
