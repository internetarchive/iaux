import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';

/**
 * This class augments the transcript entry with the start and end indices.
 * This is useful for more rapidly splitting up and restoring the transcript
 * entries from the transforms that happen during the search.
 *
 * @class TranscriptIndexMap
 */
class TranscriptIndexMap {
  entry: TranscriptEntryConfig;

  startIndex: number;

  endIndex: number;

  constructor(entry: TranscriptEntryConfig, startIndex: number, endIndex: number) {
    this.entry = entry;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }
}

/**
 * The first step in converting the search results back to a usable transcript
 * is to break up the overall merged transcript into search results and non-search-results
 * sections. This will allow us to more easily break it up into its original transcript
 * chunks in a subsequent process.
 *
 * This class is a container to hold those chunks. They each have a start and end index
 * from their spot in the merged transcript, the text from that chunk, and whether that
 * chunk was a search match or just regular text.
 *
 * @class SearchSeparatedTranscriptEntry
 */
class SearchSeparatedTranscriptEntry {
  startIndex: number;

  endIndex: number;

  text: string;

  isSearchMatch: boolean;

  constructor(startIndex: number, endIndex: number, text: string, isSearchMatch: boolean) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.text = text;
    this.isSearchMatch = isSearchMatch;
  }
}

export default class SearchHandler {
  private transcriptConfig: TranscriptConfig;

  /**
   * This gets populated as part of the search index build. It maps the start and end indicies
   * of all of the transcript entries so we can quickly look up where an entry is in the
   * overall transcript.
   *
   * @private
   * @type {TranscriptIndexMap[]}
   * @memberof SearchHandler
   */
  private transcriptEntryIndices: TranscriptIndexMap[] = [];

  /**
   * This gets populated as part of the search index build. It merges all of the transcript
   * entries together so we can search it as a single document instead of a bunch of
   * individual entries. This allows searches to cross over transcript entries.
   *
   * NOTE: When the mergedTranscript gets created, spaces are put between each transcript
   * entry, otherwise the words would run into each other. We account for this in the
   * indices above.
   *
   * @private
   * @memberof SearchHandler
   */
  private mergedTranscript = '';

  constructor(transcriptConfig: TranscriptConfig) {
    this.transcriptConfig = transcriptConfig;
    this.buildIndex();
  }

  search(term: string): TranscriptConfig {
    const searchSeparatedTranscript = this.getSearchSeparatedTranscript(term);
    const newTranscriptEntries: TranscriptEntryConfig[] = [];

    let currentSearchResultIndex = 0;
    let currentSourceTranscriptEntryMap: TranscriptIndexMap|undefined;
    let newTranscriptEntry: TranscriptEntryConfig;

    searchSeparatedTranscript.forEach((entry) => {
      const entryCharArray = Array.from(entry.text);

      // console.log('create newTranscriptEntry1, previous: ', newTranscriptEntry.displayText);
      // newTranscriptEntry = this.createBlankTranscriptEntryConfig(
      //   currentSourceTranscriptEntryMap.entry
      // );
      // newTranscriptEntries.push(newTranscriptEntry);

      console.log('searchEntry', entry.text, entry.startIndex, entry.endIndex);

      if (entry.isSearchMatch) {
        console.log('isMatch', entry.text);
        newTranscriptEntry.searchMatchIndex = currentSearchResultIndex;
        currentSearchResultIndex += 1;
      }

      entryCharArray.forEach((character, index) => {
        const overallCharIndex = entry.startIndex + index;
        const resultIndexMap = this.getTranscriptEntryIndexMap(overallCharIndex);

        if (!resultIndexMap) {
          console.log('no result indexfound', overallCharIndex, entry.startIndex, entry.endIndex);
          return;
        }

        console.log('character', character, overallCharIndex, entry.endIndex);

        // step 1: make sure we have a valid source index
        if (
          overallCharIndex >= resultIndexMap.startIndex
          && overallCharIndex < resultIndexMap.endIndex
        ) {
          console.log('addChar', character);
          newTranscriptEntry.rawText += character;
          return;
        }

        console.log('continuing', character, overallCharIndex, entry.endIndex);

        if (overallCharIndex > entry.endIndex) {
          console.log('end1');
          return;
        }

        newTranscriptEntry.rawText = newTranscriptEntry.rawText.trim();

        // we've reached the last indexMap
        // if (currentSourceEntryIndex + 1 > this.transcriptEntryIndices.length) {
        //   console.log('end2');
        //   return;
        // }
        // currentSourceEntryIndex += 1;
        // currentSourceTranscriptEntryMap = this.transcriptEntryIndices[currentSourceEntryIndex];

        // console.log('create newTranscriptEntry2, previous:', newTranscriptEntry.displayText);
      });
    });

    console.log(newTranscriptEntries.map(entry => entry.displayText));

    const newTranscript = new TranscriptConfig(newTranscriptEntries);

    return newTranscript;
  }

  private getTranscriptEntryIndexMap(overallCharIndex: number): TranscriptIndexMap|undefined {
    return this.transcriptEntryIndices.find(entry => (
      entry.endIndex > overallCharIndex && entry.startIndex <= overallCharIndex
    ));
  }

  private createBlankTranscriptEntryConfig(sourceTranscriptConfig: TranscriptEntryConfig): TranscriptEntryConfig {
    return new TranscriptEntryConfig(
      sourceTranscriptConfig.id,
      sourceTranscriptConfig.start,
      sourceTranscriptConfig.end,
      '',
      sourceTranscriptConfig.isMusic,
    );
  }

  /**
   * Split up the non-search-result entries to match the breakpoints from
   * the original transcript. This makes re-building the original transcript
   * much easer.
   *
   * @private
   * @param {string} term
   * @returns {SearchSeparatedTranscriptEntry[]}
   * @memberof SearchHandler
   */
  private getTranscriptSeparatedSearchResults(term: string): SearchSeparatedTranscriptEntry[] {
    const searchSeparatedTranscript = this.getSearchSeparatedTranscript(term);
    const newEntries: SearchSeparatedTranscriptEntry[] = [];
    searchSeparatedTranscript.forEach((entry) => {
      if (entry.isSearchMatch) {
        newEntries.push(entry);
        return;
      }

      const originalEntriesInEntry = this.transcriptEntryIndices.filter((entryIndices) => {
        // console.log(entryIndices, entry);
        entryIndices.startIndex >= entry.startIndex && entryIndices.endIndex <= entry.endIndex;
      });

      // console.log('originalEntriesInEntry', this.transcriptEntryIndices, originalEntriesInEntry);

      originalEntriesInEntry.forEach((originalEntry) => {
        const newEntryText = entry.text.substring(originalEntry.startIndex, originalEntry.endIndex);
        const newEntry = new SearchSeparatedTranscriptEntry(
          originalEntry.startIndex, originalEntry.endIndex, newEntryText, false
        );
        newEntries.push(newEntry);
      });
    });
    return newEntries;
  }

  /**
   * Search the full transcript and split up by search results and non-results
   *
   * @private
   * @param {string} term
   * @returns {SearchSeparatedTranscriptEntry[]}
   * @memberof SearchHandler
   */
  private getSearchSeparatedTranscript(term: string): SearchSeparatedTranscriptEntry[] {
    const searchIndices = this.getSearchIndices(term);
    if (searchIndices.length === 0) {
      return [new SearchSeparatedTranscriptEntry(0, this.mergedTranscript.length, this.mergedTranscript, false)];
    }

    const transcriptEntries: SearchSeparatedTranscriptEntry[] = [];
    let startIndex = 0;
    searchIndices.forEach((index) => {
      const nextStart = index + term.length;
      const nonResultText = this.mergedTranscript.substring(startIndex, index);
      const resultText = this.mergedTranscript.substring(index, nextStart);
      const nonResultEntry = new SearchSeparatedTranscriptEntry(startIndex, index - 1, nonResultText, false);
      const searchResultEntry = new SearchSeparatedTranscriptEntry(index, nextStart - 1, resultText, true);
      transcriptEntries.push(nonResultEntry);
      transcriptEntries.push(searchResultEntry);
      startIndex = nextStart;
    });
    const finalResultText = this.mergedTranscript.substring(startIndex, this.mergedTranscript.length);
    const finalResultEntry = new SearchSeparatedTranscriptEntry(
      startIndex, this.mergedTranscript.length, finalResultText, false
    );
    transcriptEntries.push(finalResultEntry);

    return transcriptEntries;
  }

  private getSearchIndices(term: string): number[] {
    const regex = new RegExp(term, 'gi');

    const startIndices: number[] = [];
    let result;
    while ((result = regex.exec(this.mergedTranscript))) {
      startIndices.push(result.index);
    }

    return startIndices;
  }

  private buildIndex() {
    let startIndex = 0;
    this.transcriptConfig.entries.forEach((entry: TranscriptEntryConfig) => {
      const { displayText } = entry;

      const indexMap: TranscriptIndexMap = new TranscriptIndexMap(
        entry,
        startIndex,
        startIndex + displayText.length
      );
      this.transcriptEntryIndices.push(indexMap);
      this.mergedTranscript += `${entry.displayText} `;
      startIndex = this.mergedTranscript.length;
    });
    this.mergedTranscript = this.mergedTranscript.trim();
  }
}
