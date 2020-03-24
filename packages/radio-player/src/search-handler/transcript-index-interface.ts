import { TranscriptEntryRange } from './search-models';

/**
 * The TranscriptIndexInterface defines methods needed to access and rebuild the transcript.
 *
 * @export
 * @interface TranscriptIndexInterface
 */
export interface TranscriptIndexInterface {
  /**
   * The merged transcript, combining all entries with a single space
   *
   * @type {string}
   * @memberof TranscriptIndexInterface
   */
  mergedTranscript: string;

  /**
   * The merged transcript lowercased for case-insensitive lookups
   *
   * @type {string}
   * @memberof TranscriptIndexInterface
   */
  mergedTranscriptLowercased: string;

  /**
   * An array of transcript entries with their associated character ranges
   *
   * @type {TranscriptEntryRange[]}
   * @memberof TranscriptIndexInterface
   */
  transcriptEntryRanges: TranscriptEntryRange[];

  /**
   * Get the TranscriptEntryRange at a given index
   *
   * @param {number} overallCharIndex
   * @returns {(TranscriptEntryRange | undefined)}
   * @memberof TranscriptIndexInterface
   */
  getTranscriptEntryAt(overallCharIndex: number): TranscriptEntryRange | undefined;
}
