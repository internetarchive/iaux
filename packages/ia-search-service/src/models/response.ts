/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from './metadata';

export class Response {
  numFound: number;

  start: number;

  docs: Metadata[];

  constructor(json: any) {
    this.numFound = json.numFound;
    this.start = json.start;
    this.docs = json.docs.map((doc: any) => new Metadata(doc));
  }
}
