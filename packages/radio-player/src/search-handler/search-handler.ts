import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';
import { Range, TranscriptEntryRange, SearchResult } from './search-models';
import { SearchHelper } from './search-helper';
import { SearchIndex } from './search-index';

/**
 * This is the main entrypoint into transcript searching. It has a single
 * public method, `search(term: string)`, that returns a `TranscriptConfig`
 * with a search-modified transcript. This means the original transcript
 * entries get merged with search results since search results can span
 * across transcript entries.
 *
 * It offloads some of the searching work to the `SearchIndex` object that
 * is responsible for indexing the transcript with information that makes
 * it easier to rebuild the transcript later.
 */
export default class SearchHandler {
  private searchIndex: SearchIndex;

  constructor(transcriptConfig: TranscriptConfig) {
    this.searchIndex = new SearchIndex(transcriptConfig);
  }

  search(term: string): TranscriptConfig {
    const searchSeparatedTranscript = this.getSearchSeparatedTranscript(term);
    const newTranscriptEntries: TranscriptEntryConfig[] = [];

    let searchResultIndex = 0;

    searchSeparatedTranscript.forEach(entry => {
      // If we encounter a match, just create a new transcript entry from it and append it.
      // We don't care if it crosses over multiple transcript entries since we want one match,
      // not multiple broken up by transcript entry.
      if (entry.isSearchMatch) {
        // find the closest source transcript to this entry
        const resultIndexMap = this.searchIndex.getTranscriptEntryAt(entry.range.startIndex);
        if (!resultIndexMap) {
          return;
        }

        const newTranscriptEntry = this.createBlankTranscriptEntryConfig(resultIndexMap.entry);
        newTranscriptEntry.searchMatchIndex = searchResultIndex;
        searchResultIndex += 1;
        newTranscriptEntry.rawText = entry.text;
        newTranscriptEntries.push(newTranscriptEntry);
        return;
      }

      // Next loop through all of the source transcript entries to find the ones that intersect with this
      // search result. If it intersects, we take the intersected characters from the merged transcript
      // and make a new entry from that.
      this.searchIndex.transcriptEntryRanges.forEach((indexMap: TranscriptEntryRange) => {
        const intersection = SearchHelper.getIntersection(entry.range, indexMap.range);
        if (!intersection || intersection.length === 0) {
          return;
        }

        const newTranscriptEntry = this.createBlankTranscriptEntryConfig(indexMap.entry);
        const text = this.searchIndex.mergedTranscript.substring(
          intersection.startIndex,
          intersection.endIndex,
        );
        newTranscriptEntry.rawText = text.trim();
        newTranscriptEntries.push(newTranscriptEntry);
      });
    });

    const newTranscript = new TranscriptConfig(newTranscriptEntries);

    return newTranscript;
  }

  /**
   * Copy a transcript entry but leave the text and search result index empty.
   *
   * @private
   * @param {TranscriptEntryConfig} sourceTranscriptConfig
   * @returns {TranscriptEntryConfig}
   * @memberof SearchHandler
   */
  /* eslint-disable-next-line class-methods-use-this */
  private createBlankTranscriptEntryConfig(
    sourceTranscriptConfig: TranscriptEntryConfig,
  ): TranscriptEntryConfig {
    return new TranscriptEntryConfig(
      sourceTranscriptConfig.id,
      sourceTranscriptConfig.start,
      sourceTranscriptConfig.end,
      '',
      sourceTranscriptConfig.isMusic,
    );
  }

  /**
   * Search the full transcript and split up by search results and non-results. For instance,
   * if the full transcript is `foo bar baz boop bump snap pop` and you search for `bump`,
   * you'll get an array of 3 results back:
   * 1. `foo bar baz boop `
   * 2. `bump` <-- the match
   * 3. ` snap pop`
   *
   * This is helpful when rebuilding the transcript later to be able to identify search results.
   *
   * @private
   * @param {string} term
   * @returns {SearchResult[]}
   * @memberof SearchHandler
   */
  private getSearchSeparatedTranscript(term: string): SearchResult[] {
    const searchIndices = this.searchIndex.getSearchIndices(term);
    const mergedTranscript = this.searchIndex.mergedTranscript;

    if (searchIndices.length === 0) {
      const range = new Range(0, mergedTranscript.length);
      return [new SearchResult(range, mergedTranscript, false)];
    }

    const transcriptEntries: SearchResult[] = [];
    let startIndex = 0;
    searchIndices.forEach(index => {
      const nextStart = index + term.length;
      const nonResultText = mergedTranscript.substring(startIndex, index);
      const resultText = mergedTranscript.substring(index, nextStart);
      const nonResultRange = new Range(startIndex, index - 1);
      const nonResultEntry = new SearchResult(
        nonResultRange,
        nonResultText,
        false,
      );
      const searchResultRange = new Range(index, nextStart - 1);
      const searchResultEntry = new SearchResult(
        searchResultRange,
        resultText,
        true,
      );
      transcriptEntries.push(nonResultEntry);
      transcriptEntries.push(searchResultEntry);
      startIndex = nextStart;
    });
    const finalResultText = mergedTranscript.substring(
      startIndex,
      mergedTranscript.length,
    );
    const finalResultRange = new Range(startIndex, mergedTranscript.length);
    const finalResultEntry = new SearchResult(
      finalResultRange,
      finalResultText,
      false,
    );
    transcriptEntries.push(finalResultEntry);

    return transcriptEntries;
  }
}
