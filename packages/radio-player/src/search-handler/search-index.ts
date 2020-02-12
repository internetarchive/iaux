import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';
import { Range, TranscriptEntryRange, SearchResult } from './search-models';

export class SearchIndex {
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
   * @memberof SearchIndex
   */
  mergedTranscript = '';

  /**
   * This gets populated as part of the search index build. It maps the start and end indicies
   * of all of the transcript entries so we can quickly look up where an entry is in the
   * overall transcript.
   *
   * @private
   * @type {TranscriptEntryRange[]}
   * @memberof SearchIndex
   */
  transcriptEntryRanges: TranscriptEntryRange[] = [];

  private transcriptConfig: TranscriptConfig;

  /**
   * Find the closes TranscriptIndexMap to the given overallCharIndex
   *
   * @param overallCharIndex
   */
  getTranscriptEntryIndexMap(overallCharIndex: number): TranscriptEntryRange | undefined {
    return this.transcriptEntryRanges.find(
      entry =>
        entry.range.endIndex > overallCharIndex && entry.range.startIndex <= overallCharIndex,
    );
  }

  /**
   * Finds all of the start indices of all the search results across the entire transcript.
   *
   * @private
   * @param {string} term
   * @returns {number[]}
   * @memberof SearchIndex
   */
  getSearchIndices(term: string): number[] {
    const regex = new RegExp(term, 'gi');
    const startIndices: number[] = [];
    let result;

    /* eslint-disable-next-line no-cond-assign */
    while ((result = regex.exec(this.mergedTranscript))) {
      startIndices.push(result.index);
    }

    return startIndices;
  }

  constructor(transcriptConfig: TranscriptConfig) {
    this.transcriptConfig = transcriptConfig;
    this.buildIndex();
  }

  /**
   * Build the search index. This method does two things:
   * 1. Builds the "merged transcript" with all of the text combined into one long transcript.
   *    This allows us to search the entire thing at once instead of entry by entry.
   * 2. For each entry, get the start and end index of that particular entry within the overall
   *    transcript. This allows us to reconstruct the transcript later from the original transcript
   *    and the search results.
   *
   * @private
   * @memberof SearchHandler
   */
  private buildIndex(): void {
    let startIndex = 0;
    let transcriptEntryRanges: TranscriptEntryRange[] = [];
    let mergedTranscript = '';

    this.transcriptConfig.entries.forEach((entry: TranscriptEntryConfig) => {
      const { displayText } = entry;
      const indexMapRange: Range = new Range(startIndex, startIndex + displayText.length);
      const indexMap: TranscriptEntryRange = new TranscriptEntryRange(entry, indexMapRange);
      transcriptEntryRanges.push(indexMap);
      mergedTranscript += `${entry.displayText} `;
      startIndex = mergedTranscript.length;
    });
    mergedTranscript = mergedTranscript.trim();

    this.mergedTranscript = mergedTranscript;
    this.transcriptEntryRanges = transcriptEntryRanges
  }
}
