import { Range } from '../search-models';
import { SearchIndexInterface } from './search-index-interface';

export class RadioArchiveSearchIndex implements SearchIndexInterface {
  private identifier: string;

  constructor(identifier: string) {
    this.identifier = identifier;
  }

  /**
   * Finds all of the ranges of all the search results across the entire transcript.
   *
   * @private
   * @param {string} term
   * @returns {Promise<Range[]>}
   * @memberof SearchIndexInterface
   */
  async getSearchRanges(query: string): Promise<Range[]> {
    const ranges: Range[] = [];

    const results = await this.fetchResults(query);
    results.forEach((element: Range) => {
      ranges.push(element);
    });

    return new Promise(resolve => {
      resolve(ranges);
    });
  }

  private async fetchResults(query: string): Promise<Range[]> {
    const url = `https://58-review-radio-arch-bsdafk.archive.org/services/radio-archive/search/service.php?q=${query}&identifier=${this.identifier}&number_of_fragments=1000`;
    const response = await fetch(url);
    return response.json();

    // this.handleMetadataResponse(data);
  }
}
