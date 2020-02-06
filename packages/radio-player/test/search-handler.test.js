import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import { TranscriptConfig, TranscriptEntryConfig } from "@internetarchive/transcript-view";
import SearchHandler from '../lib/src/search-handler';

describe('Search Handler', () => {
  it('can be instantiated', async () => {
    const transcriptConfig = new TranscriptConfig([]);
    const searchHandler = new SearchHandler(transcriptConfig);
    expect(searchHandler).to.exist;
  });

  it('correctly calculates startIndex offsets', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bang boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const startIndicies = searchHandler.transcriptStartIndices;

    // note a space is added between each transcript entry so it increases each
    // subsequent index by 1
    expect(startIndicies[0].entryId).to.equal(1);
    expect(startIndicies[0].startIndex).to.equal(0);
    expect(startIndicies[0].endIndex).to.equal(11);

    expect(startIndicies[1].entryId).to.equal(2);
    expect(startIndicies[1].startIndex).to.equal(12);
    expect(startIndicies[1].endIndex).to.equal(21);

    expect(startIndicies[2].entryId).to.equal(3);
    expect(startIndicies[2].startIndex).to.equal(22);
    expect(startIndicies[2].endIndex).to.equal(32);
  });

  it('correctly builds the full text blob', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bang boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const searchHandler = new SearchHandler(transcriptConfig);

    expect(searchHandler.mergedTranscript).to.equal('foo bar baz boop blop bang boing');
  });

  it('correctly finds search indices', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump baz boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const searchIndices = searchHandler.getSearchIndices('baz');

    expect(searchIndices).to.deep.equal([8, 27]);
  });

  it('correctly generates a new transcript', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump baz boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const newTranscript = searchHandler.search('baz');

    console.log(newTranscript);

    expect(newTranscript.entris.length).to.equal(7);
  });
});
