import { ResponseHeader } from "./responseHeader";
import { Response } from "./response";

export class SearchResponse {
  responseHeader: ResponseHeader;
  response: Response;

  constructor(json: any) {
    this.responseHeader = new ResponseHeader(json.responseHeader);
    this.response = new Response(json.response);
  }
}
