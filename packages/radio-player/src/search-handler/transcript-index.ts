import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';
import { Range, TranscriptEntryRange } from './search-models';
import { TranscriptIndexInterface } from './transcript-index-interface';

export class TranscriptIndex implements TranscriptIndexInterface {
  get mergedTranscript(): string {
    return this.mergedTranscriptCache;
  }

  get mergedTranscriptLowercased(): string {
    return this.mergedTranscriptLowercasedCache;
  }

  get transcriptEntryRanges(): TranscriptEntryRange[] {
    return this.transcriptEntryRangesCache;
  }

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
   * @memberof TranscriptIndex
   */
  private mergedTranscriptCache = '';

  private mergedTranscriptLowercasedCache = '';

  /**
   * This gets populated as part of the search index build. It maps the start and end indicies
   * of all of the transcript entries so we can quickly look up where an entry is in the
   * overall transcript.
   *
   * @type {TranscriptEntryRange[]}
   * @memberof TranscriptIndex
   */
  private transcriptEntryRangesCache: TranscriptEntryRange[] = [];

  constructor(transcriptConfig: TranscriptConfig) {
    this.buildIndex(transcriptConfig);
  }

  /**
   * Find the closes TranscriptEntryRange to the given overallCharIndex
   *
   * @param overallCharIndex
   * @returns {TranscriptEntryRange | undefined}
   */
  getTranscriptEntryAt(overallCharIndex: number): TranscriptEntryRange | undefined {
    return this.transcriptEntryRanges.find(entry => {
      const { range } = entry;
      return range.endIndex > overallCharIndex && range.startIndex <= overallCharIndex;
    });
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
   * @memberof TranscriptIndex
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

    this.mergedTranscriptCache = mergedTranscript;
    this.mergedTranscriptLowercasedCache = mergedTranscript.toLowerCase();
    this.transcriptEntryRangesCache = transcriptEntryRanges;
  }
}
