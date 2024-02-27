import { Range } from '../../search-models';
import { SearchBackendInterface } from '../search-backend-interface';
import { FullTextSearchResponseDoc } from './full-text-search-response';
import { FullTextSearchServiceInterface } from './full-text-search-service-interface';

/**
 * This class is responsible for taking the response from the full text search backend
 * and converting the results into start and end indices for each of the matches.
 *
 * The start and end indices are then used by the SearchHandler to re-build the
 * transcript, separated by search results in their original time codes.
 */
export class FullTextSearchBackend implements SearchBackendInterface {
  /**
   * A FullTextSearchService that provides the fetching layer for results. This
   * object can make AJAX requests or any other backend call needed to return
   * a response.
   *
   * @private
   * @type {FullTextSearchServiceInterface}
   * @memberof FullTextSearchBackend
   */
  private service: FullTextSearchServiceInterface;

  /**
   * The start tag to match a search result, like `{{{` or `<em>`
   *
   * @private
   * @type {string}
   * @memberof FullTextSearchBackend
   */
  private startTag: string;

  /**
   * The end tag to match a search result, like `}}}` or `</em>`
   *
   * @private
   * @type {string}
   * @memberof FullTextSearchBackend
   */
  private endTag: string;

  constructor(service: FullTextSearchServiceInterface, startTag = '{{{', endTag = '}}}') {
    this.service = service;
    this.startTag = startTag;
    this.endTag = endTag;
  }

  /**
   * Finds all of the ranges of all the search results across the entire transcript.
   *
   * @private
   * @param {string} query
   * @returns {Promise<Range[]>}
   * @memberof SearchBackendInterface
   */
  async getSearchRanges(query: string): Promise<Range[]> {
    let ranges: Range[] = [];

    const results = await this.service.searchRequested(query);

    results.value.docs.forEach((result: FullTextSearchResponseDoc) => {
      const transcript = result.text;
      result.highlight.cc.forEach((highlight: string) => {
        const newRanges: Range[] = this.rangesOfResultInTranscript(highlight, transcript);
        ranges = ranges.concat(newRanges);
      });
    });

    return new Promise((resolve) => {
      resolve(ranges);
    });
  }

  /**
   * Find the Range (start and end indices) of the results
   * from the `highlight` in the `transcript`.
   *
   * Example:
   *   If `highlight` = `bar {{{baz}}} snip\n snap`
   *   and
   *   `transcript` = `beep boop\n foo bar baz snip\n snap`
   *
   * This will return [Range(20, 22)] because `baz` starts at index 20 and ends at 22
   * in the transcript.
   *
   * @param {string} highlight
   * @param {string} transcript
   * @returns {Range[]}
   */
  private rangesOfResultInTranscript(highlight: string, transcript: string): Range[] {
    const regex = new RegExp(`${this.startTag}(.*?)${this.endTag}`, 'gm');

    const startIndexOfHighlight = this.getStartIndexOfHighlight(highlight, transcript);
    const totalTagLength = this.startTag.length + this.endTag.length;

    const ranges: Range[] = [];

    let matchIndex = 0;
    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(highlight)) !== null) {
      const startIndex = match.index;
      const matchLength = match[1].length;

      const adjustedMatchStart = startIndex - matchIndex * totalTagLength;
      const overallMatchStart = startIndexOfHighlight + adjustedMatchStart;
      const matchEnd = overallMatchStart + matchLength;
      const range = new Range(overallMatchStart, matchEnd);
      ranges.push(range);
      matchIndex += 1;
    }

    return ranges;
  }

  /**
   * This method finds the highlight's overall location within the transcript.
   *
   * To do this, it strips out the start and end tags to treat it as a raw string.
   *
   * Example:
   *   If `highlight` = `bar {{{baz}}} snip\n snap`
   *   and
   *   `transcript` = `beep boop\n foo bar baz snip\n snap`
   *
   * This will return 16 because `bar baz snip...` starts at index 16.
   *
   * @param {string} highlight The highlighted string to find
   * @param {string} transcript The transcript in which to find the highlight
   * @returns {number}
   */
  private getStartIndexOfHighlight(highlight: string, transcript: string): number {
    const startTagRegex = new RegExp(this.startTag, 'gm');
    const endTagRegex = new RegExp(this.endTag, 'gm');
    const untokenizedHighlight = highlight.replace(startTagRegex, '').replace(endTagRegex, '');
    const startIndexOfHighlight = transcript.indexOf(untokenizedHighlight);
    return startIndexOfHighlight;
  }
}
