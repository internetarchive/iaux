import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import { TranscriptConfig, TranscriptEntryConfig } from "@internetarchive/transcript-view";
import SearchHandler from '../../lib/src/search-handler/search-handler';

describe('Search Handler', () => {
  it('can be instantiated', async () => {
    const transcriptConfig = new TranscriptConfig([]);
    const searchHandler = new SearchHandler(transcriptConfig);
    expect(searchHandler).to.exist;
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

    expect(firstEntry.range.startIndex).to.equal(0);
    expect(firstEntry.range.endIndex).to.equal(4);
    expect(firstEntry.text).to.equal('foo ');
    expect(firstEntry.isSearchMatch).to.equal(false);

    expect(secondEntry.range.startIndex).to.equal(4);
    expect(secondEntry.range.endIndex).to.equal(6);
    expect(secondEntry.text).to.equal('ba');
    expect(secondEntry.isSearchMatch).to.equal(true);

    expect(thirdEntry.range.startIndex).to.equal(6);
    expect(thirdEntry.range.endIndex).to.equal(8);
    expect(thirdEntry.text).to.equal('r ');
    expect(thirdEntry.isSearchMatch).to.equal(false);

    expect(fourthEntry.range.startIndex).to.equal(8);
    expect(fourthEntry.range.endIndex).to.equal(10);
    expect(fourthEntry.text).to.equal('ba');
    expect(fourthEntry.isSearchMatch).to.equal(true);

    expect(fifthEntry.range.startIndex).to.equal(10);
    expect(fifthEntry.range.endIndex).to.equal(27);
    expect(fifthEntry.text).to.equal('z boop blop bump ');
    expect(fifthEntry.isSearchMatch).to.equal(false);

    expect(sixthEntry.range.startIndex).to.equal(27);
    expect(sixthEntry.range.endIndex).to.equal(29);
    expect(sixthEntry.text).to.equal('ba');
    expect(sixthEntry.isSearchMatch).to.equal(true);

    expect(seventhEntry.range.startIndex).to.equal(29);
    expect(seventhEntry.range.endIndex).to.equal(36);
    expect(seventhEntry.text).to.equal('z boing');
    expect(seventhEntry.isSearchMatch).to.equal(false);
  });

  it('correctly generates a new transcript with search results at beginning of transcript entry', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const newTranscript = searchHandler.search('boop');

    expect(newTranscript.entries.length).to.equal(4);

    const firstEntry = newTranscript.entries[0];
    expect(firstEntry.id).to.equal(1);
    expect(firstEntry.start).to.equal(0);
    expect(firstEntry.end).to.equal(4);
    expect(firstEntry.rawText).to.equal('foo bar baz');
    expect(firstEntry.searchMatchIndex).to.equal(undefined);

    const secondEntry = newTranscript.entries[1];
    expect(secondEntry.id).to.equal(2);
    expect(secondEntry.start).to.equal(5);
    expect(secondEntry.end).to.equal(9);
    expect(secondEntry.rawText).to.equal('boop');
    expect(secondEntry.searchMatchIndex).to.equal(0);

    const thirdEntry = newTranscript.entries[2];
    expect(thirdEntry.id).to.equal(2);
    expect(thirdEntry.start).to.equal(5);
    expect(thirdEntry.end).to.equal(9);
    expect(thirdEntry.rawText).to.equal('blop');
    expect(thirdEntry.searchMatchIndex).to.equal(undefined);

    const fourthEntry = newTranscript.entries[3];
    expect(fourthEntry.id).to.equal(3);
    expect(fourthEntry.start).to.equal(10);
    expect(fourthEntry.end).to.equal(13);
    expect(fourthEntry.rawText).to.equal('bump boing');
    expect(fourthEntry.searchMatchIndex).to.equal(undefined);
  });

  it('correctly generates a new transcript with search results at end of transcript entry', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'boing bump', false);
    const entry4 = new TranscriptEntryConfig(4, 14, 18, 'snip snap', false);
    const entry5 = new TranscriptEntryConfig(5, 19, 23, 'grip grap', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3, entry4, entry5]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const newTranscript = searchHandler.search('bump');

    expect(newTranscript.entries.length).to.equal(6);

    const entryPriorToSearchMatch = newTranscript.entries[2];
    expect(entryPriorToSearchMatch.id).to.equal(3);
    expect(entryPriorToSearchMatch.start).to.equal(10);
    expect(entryPriorToSearchMatch.end).to.equal(13);
    expect(entryPriorToSearchMatch.rawText).to.equal('boing');
    expect(entryPriorToSearchMatch.searchMatchIndex).to.equal(undefined);

    const searchMatchEntry = newTranscript.entries[3];
    expect(searchMatchEntry.id).to.equal(3);
    expect(searchMatchEntry.start).to.equal(10);
    expect(searchMatchEntry.end).to.equal(13);
    expect(searchMatchEntry.rawText).to.equal('bump');
    expect(searchMatchEntry.searchMatchIndex).to.equal(0);

    const entryAfterSearchMatch = newTranscript.entries[4];
    expect(entryAfterSearchMatch.id).to.equal(4);
    expect(entryAfterSearchMatch.start).to.equal(14);
    expect(entryAfterSearchMatch.end).to.equal(18);
    expect(entryAfterSearchMatch.rawText).to.equal('snip snap');
    expect(entryAfterSearchMatch.searchMatchIndex).to.equal(undefined);
  });

  it('correctly generates a new transcript with multiple search result matches', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump boing', false);
    const entry4 = new TranscriptEntryConfig(4, 14, 17, 'fizz buzz', false);
    const entry5 = new TranscriptEntryConfig(5, 18, 23, 'blammer blommer', false);
    const entry6 = new TranscriptEntryConfig(6, 24, 28, 'slop bump snap', false);
    const entry7 = new TranscriptEntryConfig(7, 29, 34, 'ooga booga', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3, entry4, entry5, entry6, entry7]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const newTranscript = searchHandler.search('bump');

    expect(newTranscript.entries.length).to.equal(10);

    const firstSearchMatch = newTranscript.entries[2];
    expect(firstSearchMatch.id).to.equal(3);
    expect(firstSearchMatch.start).to.equal(10);
    expect(firstSearchMatch.end).to.equal(13);
    expect(firstSearchMatch.rawText).to.equal('bump');
    expect(firstSearchMatch.searchMatchIndex).to.equal(0);

    const secondSearchMatch = newTranscript.entries[7];
    expect(secondSearchMatch.id).to.equal(6);
    expect(secondSearchMatch.start).to.equal(24);
    expect(secondSearchMatch.end).to.equal(28);
    expect(secondSearchMatch.rawText).to.equal('bump');
    expect(secondSearchMatch.searchMatchIndex).to.equal(1);
  });

  it('correctly generates a new transcript with search results that cross over transcript entries', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump boing', false);
    const entry4 = new TranscriptEntryConfig(4, 14, 18, 'fizz buzz', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3, entry4]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const newTranscript = searchHandler.search('blop bump');

    expect(newTranscript.entries.length).to.equal(5);
  });

  it('correctly generates a new transcript with search results that completely cross a transcript entry', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump boing', false);  // will completely skip over this entry
    const entry4 = new TranscriptEntryConfig(4, 14, 18, 'fizz buzz', false);
    const entry5 = new TranscriptEntryConfig(5, 19, 23, 'snip snap', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3, entry4, entry5]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const newTranscript = searchHandler.search('blop bump boing fizz');

    expect(newTranscript.entries.length).to.equal(5);

    const firstEntry = newTranscript.entries[0];
    expect(firstEntry.id).to.equal(1);
    expect(firstEntry.start).to.equal(0);
    expect(firstEntry.end).to.equal(4);
    expect(firstEntry.rawText).to.equal('foo bar baz');
    expect(firstEntry.searchMatchIndex).to.equal(undefined);

    const secondEntry = newTranscript.entries[1];
    expect(secondEntry.id).to.equal(2);
    expect(secondEntry.start).to.equal(5);
    expect(secondEntry.end).to.equal(9);
    expect(secondEntry.rawText).to.equal('boop');
    expect(secondEntry.searchMatchIndex).to.equal(undefined);

    const thirdEntry = newTranscript.entries[2];
    expect(thirdEntry.id).to.equal(2);
    expect(thirdEntry.start).to.equal(5);
    expect(thirdEntry.end).to.equal(9);
    expect(thirdEntry.rawText).to.equal('blop bump boing fizz');
    expect(thirdEntry.searchMatchIndex).to.equal(0);

    const fourthEntry = newTranscript.entries[3];
    expect(fourthEntry.id).to.equal(4);
    expect(fourthEntry.start).to.equal(14);
    expect(fourthEntry.end).to.equal(18);
    expect(fourthEntry.rawText).to.equal('buzz');
    expect(fourthEntry.searchMatchIndex).to.equal(undefined);

    const fifthEntry = newTranscript.entries[4];
    expect(fifthEntry.id).to.equal(5);
    expect(fifthEntry.start).to.equal(19);
    expect(fifthEntry.end).to.equal(23);
    expect(fifthEntry.rawText).to.equal('snip snap');
    expect(fifthEntry.searchMatchIndex).to.equal(undefined);
  });

  it('correctly generates a new transcript with partial word match', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump boing', false);
    const entry4 = new TranscriptEntryConfig(4, 14, 18, 'fizz buzz', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3, entry4]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const newTranscript = searchHandler.search('bu');

    expect(newTranscript.entries.length).to.equal(7);

    const firstSearchMatch = newTranscript.entries[2];
    expect(firstSearchMatch.id).to.equal(3);
    expect(firstSearchMatch.start).to.equal(10);
    expect(firstSearchMatch.end).to.equal(13);
    expect(firstSearchMatch.rawText).to.equal('bu');
    expect(firstSearchMatch.searchMatchIndex).to.equal(0);

    const secondSearchMatch = newTranscript.entries[5];
    expect(secondSearchMatch.id).to.equal(4);
    expect(secondSearchMatch.start).to.equal(14);
    expect(secondSearchMatch.end).to.equal(18);
    expect(secondSearchMatch.rawText).to.equal('bu');
    expect(secondSearchMatch.searchMatchIndex).to.equal(1);
  });

  it('correctly generates a new transcript with multiple matches inside single entry', async () => {
    const entry1 = new TranscriptEntryConfig(1, 1.031, 6.002, 'He was pressed by reporters but Maryland Congressman Elijah Cummings declined to', false);
    const entry2 = new TranscriptEntryConfig(2, 6.003, 11.012, 'add fuel to the ongoing feud between himself and President Trump erupted last', false);
    const entry3 = new TranscriptEntryConfig(3, 11.013, 15.044, 'weekend after the president harshly criticized the Democratic lawmaker and his', false);
    const entry4 = new TranscriptEntryConfig(4, 15.045, 20.033, 'Baltimore area district which the president called Rat and road and infested', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3, entry4]);
    const searchHandler = new SearchHandler(transcriptConfig);

    const newTranscript = searchHandler.search('the');

    expect(newTranscript.entries.length).to.equal(12);

    const firstSearchMatch = newTranscript.entries[2];
    expect(firstSearchMatch.id).to.equal(2);
    expect(firstSearchMatch.start).to.equal(6.003);
    expect(firstSearchMatch.end).to.equal(11.012);
    expect(firstSearchMatch.rawText).to.equal('the');
    expect(firstSearchMatch.searchMatchIndex).to.equal(0);

    const secondSearchMatch = newTranscript.entries[5];
    expect(secondSearchMatch.id).to.equal(3);
    expect(secondSearchMatch.start).to.equal(11.013);
    expect(secondSearchMatch.end).to.equal(15.044);
    expect(secondSearchMatch.rawText).to.equal('the');
    expect(secondSearchMatch.searchMatchIndex).to.equal(1);

    const afterSecondMatch = newTranscript.entries[6];
    expect(afterSecondMatch.id).to.equal(3);
    expect(afterSecondMatch.start).to.equal(11.013);
    expect(afterSecondMatch.end).to.equal(15.044);
    expect(afterSecondMatch.rawText).to.equal('president harshly criticized');
    expect(afterSecondMatch.searchMatchIndex).to.equal(undefined);

    const thirdSearchMatch = newTranscript.entries[7];
    expect(thirdSearchMatch.id).to.equal(3);
    expect(thirdSearchMatch.start).to.equal(11.013);
    expect(thirdSearchMatch.end).to.equal(15.044);
    expect(thirdSearchMatch.rawText).to.equal('the');
    expect(thirdSearchMatch.searchMatchIndex).to.equal(2);

    const afterThirdSearchMatch = newTranscript.entries[8];
    expect(afterThirdSearchMatch.id).to.equal(3);
    expect(afterThirdSearchMatch.start).to.equal(11.013);
    expect(afterThirdSearchMatch.end).to.equal(15.044);
    expect(afterThirdSearchMatch.rawText).to.equal('Democratic lawmaker and his');
    expect(afterThirdSearchMatch.searchMatchIndex).to.equal(undefined);
  });
});
