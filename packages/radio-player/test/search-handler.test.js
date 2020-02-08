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

  it('correctly calculates entry start and end index offsets', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bang boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const entryStartEndIndices = searchHandler.transcriptEntryIndices;

    // note a space is added between each transcript entry so it increases each
    // subsequent index by 1
    expect(entryStartEndIndices[0].entryId).to.equal(1);
    expect(entryStartEndIndices[0].startIndex).to.equal(0);
    expect(entryStartEndIndices[0].endIndex).to.equal(11);

    expect(entryStartEndIndices[1].entryId).to.equal(2);
    expect(entryStartEndIndices[1].startIndex).to.equal(12);
    expect(entryStartEndIndices[1].endIndex).to.equal(21);

    expect(entryStartEndIndices[2].entryId).to.equal(3);
    expect(entryStartEndIndices[2].startIndex).to.equal(22);
    expect(entryStartEndIndices[2].endIndex).to.equal(32);
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

  it('correctly splits up transcript search results', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump baz boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const transcriptSearchResults = searchHandler.getSearchSeparatedTranscript('ba');

    expect(transcriptSearchResults.length).to.equal(7);

    const firstEntry = transcriptSearchResults[0];
    const secondEntry = transcriptSearchResults[1];
    const thirdEntry = transcriptSearchResults[2];
    const fourthEntry = transcriptSearchResults[3];
    const fifthEntry = transcriptSearchResults[4];
    const sixthEntry = transcriptSearchResults[5];
    const seventhEntry = transcriptSearchResults[6];

    expect(firstEntry.startIndex).to.equal(0);
    expect(firstEntry.endIndex).to.equal(3);
    expect(firstEntry.text).to.equal('foo ');
    expect(firstEntry.isSearchMatch).to.equal(false);

    expect(secondEntry.startIndex).to.equal(4);
    expect(secondEntry.endIndex).to.equal(5);
    expect(secondEntry.text).to.equal('ba');
    expect(secondEntry.isSearchMatch).to.equal(true);

    expect(thirdEntry.startIndex).to.equal(6);
    expect(thirdEntry.endIndex).to.equal(7);
    expect(thirdEntry.text).to.equal('r ');
    expect(thirdEntry.isSearchMatch).to.equal(false);

    expect(fourthEntry.startIndex).to.equal(8);
    expect(fourthEntry.endIndex).to.equal(9);
    expect(fourthEntry.text).to.equal('ba');
    expect(fourthEntry.isSearchMatch).to.equal(true);

    expect(fifthEntry.startIndex).to.equal(10);
    expect(fifthEntry.endIndex).to.equal(26);
    expect(fifthEntry.text).to.equal('z boop blop bump ');
    expect(fifthEntry.isSearchMatch).to.equal(false);

    expect(sixthEntry.startIndex).to.equal(27);
    expect(sixthEntry.endIndex).to.equal(28);
    expect(sixthEntry.text).to.equal('ba');
    expect(sixthEntry.isSearchMatch).to.equal(true);

    expect(seventhEntry.startIndex).to.equal(29);
    expect(seventhEntry.endIndex).to.equal(36);
    expect(seventhEntry.text).to.equal('z boing');
    expect(seventhEntry.isSearchMatch).to.equal(false);
  });
});
