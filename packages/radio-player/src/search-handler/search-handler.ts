import { TranscriptConfig, TranscriptEntryConfig } from '@internetarchive/transcript-view';
import { Range, TranscriptEntryRange, SearchResult } from './search-models';
import { SearchHelper } from './search-helper';
import { SearchBackendInterface } from './search-backends/search-backend-interface';
import { TranscriptIndexInterface } from './transcript-index-interface';
import { SearchHandlerInterface } from './search-handler-interface';

/**
 * This is the main entrypoint into transcript searching. It has a single
 * public method as defined by `SearchHandlerInterface`: `search(term: string)`,
 * that returns a `Promise<TranscriptConfig>` with a search-modified transcript.
 * This means the original transcript entries get merged with search results since
 * search results can span across transcript entries.
 *
 * It offloads the searching work to a `SearchBackendInterface` object that
 * is responsible for returning the search result `Range` objects based on some
 * backend search like the `LocalSearchBackend` or `FullTextSearchBackend`.
 *
 * It also uses a `TranscriptIndexInterface` object that is responsible for indexing
 * the transcipt to make reassembly much more efficient.
 */
export class SearchHandler implements SearchHandlerInterface {
  /**
   * The SearchBackend used to executes searches.
   *
   * @private
   * @type {SearchBackendInterface}
   * @memberof SearchHandler
   */
  private searchBackend: SearchBackendInterface;

  /**
   * The TranscriptIndex to help with reassembly of the transcript.
   *
   * @private
   * @type {TranscriptIndexInterface}
   * @memberof SearchHandler
   */
  private transcriptIndex: TranscriptIndexInterface;

  constructor(searchBackend: SearchBackendInterface, transcriptIndex: TranscriptIndexInterface) {
    this.searchBackend = searchBackend;
    this.transcriptIndex = transcriptIndex;
  }

  /**
   * This is the main method in here. It takes a search term and returns a TranscriptConfig
   * that has been modified to insert the search results.
   *
   * @param {string} query
   * @returns {TranscriptConfig}
   * @memberof SearchHandler
   */
  async search(query: string): Promise<TranscriptConfig> {
    const searchSeparatedTranscript = await this.getSearchSeparatedTranscript(query);
    const newTranscriptEntries: TranscriptEntryConfig[] = [];

    let searchResultIndex = 0;
    let entryIdentifier = 1;

    searchSeparatedTranscript.forEach((entry) => {
      // If we encounter a match, just create a new transcript entry from it and append it.
      // We don't care if it crosses over multiple transcript entries since we want one match,
      // not multiple broken up by transcript entry.
      if (entry.isSearchMatch) {
        // find the closest source transcript to this entry
        const startEntry = this.transcriptIndex.getTranscriptEntryAt(entry.range.startIndex);
        if (!startEntry) {
          return;
        }

        const { range } = entry;
        const { endIndex } = range;
        const endEntry = this.transcriptIndex.getTranscriptEntryAt(endIndex) || startEntry;
        const newTranscriptEntry = this.createBlankTranscriptEntryConfig(startEntry.entry);
        newTranscriptEntry.searchMatchIndex = searchResultIndex;
        searchResultIndex += 1;
        newTranscriptEntry.rawText = entry.text;
        newTranscriptEntry.id = entryIdentifier;
        entryIdentifier += 1;
        newTranscriptEntry.end = endEntry.entry.end;
        newTranscriptEntries.push(newTranscriptEntry);
        return;
      }

      // Next loop through all of the source transcript entries to find the ones that intersect
      // with this search result. If it intersects, we take the intersected characters from the
      // merged transcript and make a new entry from that.
      this.transcriptIndex.transcriptEntryRanges.forEach((indexMap: TranscriptEntryRange) => {
        const intersection = SearchHelper.getIntersection(entry.range, indexMap.range);
        if (!intersection || intersection.length === 0) {
          return;
        }

        const newTranscriptEntry = this.createBlankTranscriptEntryConfig(indexMap.entry);
        const text = this.transcriptIndex.mergedTranscript.substring(
          intersection.startIndex,
          intersection.endIndex,
        );
        newTranscriptEntry.rawText = text.trim();
        newTranscriptEntry.id = entryIdentifier;
        entryIdentifier += 1;
        newTranscriptEntries.push(newTranscriptEntry);
      });
    });

    const newTranscript = new TranscriptConfig(newTranscriptEntries);

    return new Promise(resolve => resolve(newTranscript));
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
   * @param {string} query
   * @returns {SearchResult[]}
   * @memberof SearchHandler
   */
  async getSearchSeparatedTranscript(query: string): Promise<SearchResult[]> {
    const searchRanges: Range[] = await this.searchBackend.getSearchRanges(query);
    const { mergedTranscript } = this.transcriptIndex;

    // if there's no search results, just return a single SearchResult that is the full
    // transcript marked as not a match.
    if (searchRanges.length === 0) {
      const range = new Range(0, mergedTranscript.length);
      return new Promise(resolve => resolve([new SearchResult(range, mergedTranscript, false)]));
    }


    // Sort the search range results from start to end
    // The search engine may return results in any order but while processing the results here,
    // we are going from start to finish. If the search results are out of order, it rebuilds
    // incorrect blocks of search results.
    searchRanges.sort((a: Range, b: Range) => (a.startIndex - b.startIndex));

    const transcriptEntries: SearchResult[] = [];
    let startIndex = 0;

    // Loop through all of the search result ranges and construct an array
    // of SearchResult entries.
    // For instance, if the full transcript is `foo bar baz boop bump snip snap`
    // and you search for `baz`, we'll only have a single search range: Range(8, 11).
    // We then take the text leading up to that range and store it as the "non result"
    // so we now have Range(0, 7) and Range(8, 11).
    // If there were more search results, we would continue from index 12 to build
    // the next range to the next match.
    // Finally once all the matches are finished, tack on the remaining text to the end.
    searchRanges.forEach((searchRange) => {
      // first find the "non-result" range, which is the current `startIndex` up to
      // `range.startIndex` (the start of the search result)
      const nonResultRange = new Range(startIndex, searchRange.startIndex);
      const nonResultEntry = this.getSearchResult(nonResultRange, false);
      transcriptEntries.push(nonResultEntry);

      // get the search result match from the merged transcript
      // using the current search range
      const searchResultEntry = this.getSearchResult(searchRange, true);
      transcriptEntries.push(searchResultEntry);

      startIndex = searchRange.endIndex;
    });

    // add any remaining characters as the last final entry in the results
    const finalResultRange = new Range(startIndex, mergedTranscript.length);
    const finalResultEntry = this.getSearchResult(finalResultRange, false);
    transcriptEntries.push(finalResultEntry);

    return new Promise(resolve => resolve(transcriptEntries));
  }

  /**
   * Generate a SearchResult entry from a given Range and annotate it
   * with whether or not it is a search result match
   *
   * @private
   * @param {Range} range
   * @param {boolean} isSearchResult
   * @returns {SearchResult}
   * @memberof SearchHandler
   */
  private getSearchResult(range: Range, isSearchResult: boolean): SearchResult {
    const { mergedTranscript } = this.transcriptIndex;
    const text = mergedTranscript.substring(range.startIndex, range.endIndex);
    const searchResult = new SearchResult(range, text, isSearchResult);
    return searchResult;
  }
}
