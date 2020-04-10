/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseHeader } from './response-header';
import { Response } from './response';

export class SearchResponse {
  rawResponse: any;

  responseHeader: ResponseHeader;

  response: Response;

  constructor(json: any) {
    this.rawResponse = json;
    this.responseHeader = new ResponseHeader(json.responseHeader);
    this.response = new Response(json.response);
  }
}
