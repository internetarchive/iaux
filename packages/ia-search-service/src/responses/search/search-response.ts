/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseHeader } from './response-header';
import { Response } from './response';

/**
 * The top-level response model when retrieving a response from the advanced search endpoint.
 *
 * @export
 * @class SearchResponse
 */
export class SearchResponse {
  /**
   * The raw JSON received from the endpoint. This is useful for inspecting if needed.
   *
   * @type {*}
   * @memberof SearchResponse
   */
  rawResponse: any;

  /**
   * The resonse header
   *
   * @type {ResponseHeader}
   * @memberof SearchResponse
   */
  responseHeader: ResponseHeader;

  /**
   * The response containing the search results
   *
   * @type {Response}
   * @memberof SearchResponse
   */
  response: Response;

  constructor(json: any) {
    this.rawResponse = json;
    this.responseHeader = new ResponseHeader(json.responseHeader);
    this.response = new Response(json.response);
  }
}
