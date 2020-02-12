import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';

/**
 * A model to store the start and end indices for a given context.
 * This is used for augmenting the source transcript entries (`TranscriptIndexMap`)
 * as well as the search result entries (`SearchSeparatedTranscriptEntry`) below.
 *
 * @class Range
 */
class Range {
  startIndex: number;

  endIndex: number;

  get length(): number {
    return Math.abs(this.endIndex - this.startIndex);
  }

  constructor(startIndex: number, endIndex: number) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }
}

/**
 * This class augments the transcript entry with the range of the characters
 * in the merged transcript. This is useful for more rapidly splitting up and
 * restoring the transcript entries from the transforms that happen during the search.
 *
 * @class TranscriptIndexMap
 */
class TranscriptEntryRange {
  entry: TranscriptEntryConfig;

  range: Range;

  constructor(entry: TranscriptEntryConfig, range: Range) {
    this.entry = entry;
    this.range = range;
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
class SearchResult {
  range: Range;

  text: string;

  isSearchMatch: boolean;

  constructor(range: Range, text: string, isSearchMatch: boolean) {
    this.range = range;
    this.text = text;
    this.isSearchMatch = isSearchMatch;
  }
}

export { Range, TranscriptEntryRange, SearchResult };
