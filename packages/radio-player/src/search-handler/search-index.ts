import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';
import { Range, TranscriptEntryRange } from './search-models';

class SearchIndexCache {
  /**
   * This gets populated as part of the search index build. It merges all of the transcript
   * entries together so we can search it as a single document instead of a bunch of
   * individual entries. This allows searches to cross over transcript entries.
   *
   * NOTE: When the mergedTranscript gets created, spaces are put between each transcript
   * entry, otherwise the words would run into each other. We account for this in the
   * indices above.
   *
   * @type {string}
   * @memberof SearchIndexCache
   */
  readonly mergedTranscript: string = '';

  readonly mergedTranscriptLowercased: string = '';

  /**
   * This gets populated as part of the search index build. It maps the start and end indicies
   * of all of the transcript entries so we can quickly look up where an entry is in the
   * overall transcript.
   *
   * @type {TranscriptEntryRange[]}
   * @memberof SearchIndexCache
   */
  readonly transcriptEntryRanges: TranscriptEntryRange[] = [];

  constructor(mergedTranscript = '', transcriptEntryRanges: TranscriptEntryRange[] = []) {
    this.mergedTranscript = mergedTranscript;
    this.transcriptEntryRanges = transcriptEntryRanges;
    this.mergedTranscriptLowercased = mergedTranscript.toLowerCase();
  }
}

/* eslint-disable import/prefer-default-export */
export class SearchIndex {
  /**
   * Make these properties readonly. We don't want outside classes touching the private storage.
   *
   * @readonly
   * @type {string}
   * @memberof SearchIndex
   */
  get mergedTranscript(): string {
    return this.searchIndexCache.mergedTranscript;
  }

  get transcriptEntryRanges(): TranscriptEntryRange[] {
    return this.searchIndexCache.transcriptEntryRanges;
  }

  /**
   * This gets populated as part of the search index build. It merges all of the transcript
   * entries together so we can search it as a single document instead of a bunch of
   * individual entries. This allows searches to cross over transcript entries.
   *
   * It also indexes the entries so we can quickly look them up later.
   *
   * @private
   * @memberof SearchIndex
   */
  private searchIndexCache: SearchIndexCache = new SearchIndexCache();

  /**
   * Find the closes TranscriptEntryRange to the given overallCharIndex
   *
   * @param overallCharIndex
   * @returns {TranscriptEntryRange | undefined}
   */
  getTranscriptEntryAt(overallCharIndex: number): TranscriptEntryRange | undefined {
    return this.searchIndexCache.transcriptEntryRanges.find(entry => {
      const { range } = entry;
      return range.endIndex > overallCharIndex && range.startIndex <= overallCharIndex;
    });
  }

  /**
   * Finds all of the ranges of all the search results across the entire transcript.
   *
   * @private
   * @param {string} term
   * @returns {Range[]}
   * @memberof SearchIndex
   */
  getSearchRanges(term: string): Range[] {
    const ranges: Range[] = [];
    const termLowerCased: string = term.toLowerCase();

    let index = -1;
    /* eslint-disable-next-line no-cond-assign */
    while (
      (index = this.searchIndexCache.mergedTranscriptLowercased.indexOf(
        termLowerCased,
        index + 1,
      )) !== -1
    ) {
      const newRange: Range = new Range(index, index + termLowerCased.length);
      ranges.push(newRange);
    }

    return ranges;
  }

  constructor(transcriptConfig: TranscriptConfig) {
    this.buildIndex(transcriptConfig);
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
  private buildIndex(transcriptConfig: TranscriptConfig): void {
    let startIndex = 0;
    const transcriptEntryRanges: TranscriptEntryRange[] = [];
    let mergedTranscript = '';

    transcriptConfig.entries.forEach((entry: TranscriptEntryConfig) => {
      const { displayText } = entry;
      const indexMapRange: Range = new Range(startIndex, startIndex + displayText.length);
      const indexMap: TranscriptEntryRange = new TranscriptEntryRange(entry, indexMapRange);
      transcriptEntryRanges.push(indexMap);
      mergedTranscript += `${entry.displayText} `;
      startIndex = mergedTranscript.length;
    });
    mergedTranscript = mergedTranscript.trim();

    this.searchIndexCache = new SearchIndexCache(mergedTranscript, transcriptEntryRanges);
  }
}
