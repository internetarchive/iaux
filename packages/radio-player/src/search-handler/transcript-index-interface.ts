import { TranscriptEntryRange } from './search-models';

export interface TranscriptIndexInterface {
  mergedTranscript: string;
  mergedTranscriptLowercased: string;
  transcriptEntryRanges: TranscriptEntryRange[];
  getTranscriptEntryAt(overallCharIndex: number): TranscriptEntryRange | undefined;
}
