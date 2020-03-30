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

    return new Promise(resolve => {
      resolve(ranges);
    });
  }

  /**
   * Find the range of the results in the `highlight` amongst the `transcript`.
   *
   * @param {string} highlight
   * @param {string} transcript
   * @returns {Range[]}
   */
  private rangesOfResultInTranscript(highlight: string, transcript: string): Range[] {
    const regex = new RegExp(`${this.startTag}(.*?)${this.endTag}`, 'gm');

    const startIndexOfHighlight = this.getStartIndexOfHighlight(highlight, transcript);

    let match;
    const currentHighlight = highlight;
    const matchStarts = [];
    const matchLengths = [];
    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(currentHighlight)) !== null) {
      matchStarts.push(match.index);
      matchLengths.push(match[1].length);
    }

    const ranges: Range[] = [];
    const totalTagLength = this.startTag.length + this.endTag.length;
    for (let index = 0; index < matchStarts.length; index += 1) {
      const adjustedMatchStart = matchStarts[index] - index * totalTagLength;
      const overallMatchStart = startIndexOfHighlight + adjustedMatchStart;
      const matchEnd = overallMatchStart + matchLengths[index];
      const range = new Range(overallMatchStart, matchEnd);
      ranges.push(range);
    }

    return ranges;
  }

  /**
   * This method finds the highlight's overall location within the transcript.
   *
   * To do this, it strips out the start and end tags to treat it as a raw string.
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
