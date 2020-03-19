import { Range } from '../search-models';
import { SearchIndexInterface } from './search-index-interface';

export class RadioArchiveSearchIndex implements SearchIndexInterface {
  private identifier: string;

  private startTag: string;

  private endTag: string;

  constructor(identifier: string, startTag = '{{{', endTag = '}}}') {
    this.identifier = identifier;
    this.startTag = startTag;
    this.endTag = endTag;
  }

  /**
   * Finds all of the ranges of all the search results across the entire transcript.
   *
   * @private
   * @param {string} query
   * @returns {Promise<Range[]>}
   * @memberof SearchIndexInterface
   */
  async getSearchRanges(query: string): Promise<Range[]> {
    let ranges: Range[] = [];

    const results = await this.fetchResults(query);

    results.value.docs.forEach((result: any) => {
      const transcript = result.text;
      result.highlight.cc.forEach((highlight: any) => {
        const newRanges: Range[] = this.rangesOfResultInTranscript(highlight, transcript);
        ranges = ranges.concat(newRanges);
      });
    });

    return new Promise(resolve => {
      resolve(ranges);
    });
  }

  /**
   * Find the ranges of the results from the search engine response.
   *
   * @param highlight
   * @param transcript
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
   * @param highlight string The highlighted string to find
   * @param transcript string The transcript in which to find the highlight
   */
  private getStartIndexOfHighlight(highlight: string, transcript: string): number {
    const startTagRegex = new RegExp(this.startTag, 'gm');
    const endTagRegex = new RegExp(this.endTag, 'gm');
    const untokenizedHighlight = highlight.replace(startTagRegex, '').replace(endTagRegex, '');
    const startIndexOfHighlight = transcript.indexOf(untokenizedHighlight);
    return startIndexOfHighlight;
  }

  private async fetchResults(query: string): Promise<any> {
    const url = `https://58-review-radio-arch-bsdafk.archive.org/services/radio-archive/search/service.php?q=${query}&identifier=${this.identifier}&number_of_fragments=1000&scope=all`;
    const response = await fetch(url);
    return response.json();
  }
}
