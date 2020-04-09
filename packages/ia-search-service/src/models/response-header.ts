/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseParams } from './response-params';

export class ResponseHeader {
  status: number;

  QTime: number;

  params: ResponseParams;

  constructor(json: any) {
    this.status = json.status;
    this.QTime = json.QTime;
    this.params = new ResponseParams(json.params);
  }
}
