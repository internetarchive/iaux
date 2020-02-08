import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';

/**
 * This class augments the transcript entry with the start and end indices.
 * This is useful for more rapidly splitting up and restoring the transcript
 * entries from the transforms that happen during the search.
 *
 * @class TranscriptIndexMap
 */
class TranscriptIndexMap {
  entryId: number;

  startIndex: number;

  endIndex: number;

  constructor(entryId: number, startIndex: number, endIndex: number) {
    this.entryId = entryId;
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

  private transcriptEntryIndices: TranscriptIndexMap[] = [];

  private mergedTranscript = '';

  constructor(transcriptConfig: TranscriptConfig) {
    this.transcriptConfig = transcriptConfig;
    this.buildIndex();
  }

  search(term: string): TranscriptConfig {
    const searchSeparatedTranscript = this.getSearchSeparatedTranscript(term);
    const newTranscriptEntries: TranscriptEntryConfig[] = [];

    searchSeparatedTranscript.forEach((entry) => {

    });


    const newTranscript = new TranscriptConfig(newTranscriptEntries);

    return newTranscript;
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
    var newEntries: SearchSeparatedTranscriptEntry[] = [];
    searchSeparatedTranscript.forEach((entry) => {
      if (entry.isSearchMatch) {
        newEntries.push(entry);
        return;
      }

      const originalEntriesInEntry = this.transcriptEntryIndices.filter((entryIndices) => {
        console.log(entryIndices, entry);
        entryIndices.startIndex >= entry.startIndex && entryIndices.endIndex <= entry.endIndex
      });

      console.log('originalEntriesInEntry', this.transcriptEntryIndices, originalEntriesInEntry);

      originalEntriesInEntry.forEach((originalEntry) => {
        const newEntryText = entry.text.substring(originalEntry.startIndex, originalEntry.endIndex);
        const newEntry = new SearchSeparatedTranscriptEntry(
          originalEntry.startIndex, originalEntry.endIndex, newEntryText, false);
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
        entry.id,
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
