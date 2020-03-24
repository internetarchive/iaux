/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * This file contains the response models for the full text search backend.
 *
 * On receiving the response, we deserialize the raw JSON into `FullTextSearchResponse`,
 * which cascades down into all of the child models.
 */

export class FullTextSearchResponse {
  success: boolean;

  value: FullTextSearchResponseValue;

  constructor(payload: any) {
    this.success = payload.success;
    this.value = new FullTextSearchResponseValue(payload.value);
  }
}

export class FullTextSearchResponseValue {
  numFound: number;

  start: number;

  docs: FullTextSearchResponseDoc[];

  highlighting: { [key: string]: FullTextSearchResponseValueHighlighting } = {};

  facetCounts: FullTextSearchResponseValueFacetCounts;

  constructor(payload: any) {
    this.numFound = payload.numFound;
    this.start = payload.start;
    this.docs = payload.docs.map((doc: any) => new FullTextSearchResponseDoc(doc));

    Object.keys(payload.highlighting).forEach(key => {
      const highlighting = payload.highlighting[key];
      this.highlighting[key] = new FullTextSearchResponseValueHighlighting(highlighting);
    });

    this.facetCounts = new FullTextSearchResponseValueFacetCounts(payload.facet_counts);
  }
}

export class FullTextSearchResponseDoc {
  identifier: string;

  title: string;

  text: string;

  times: string;

  downloads: number;

  collection: string;

  highlight: FullTextSearchResponseDocHighlight;

  description: string;

  mediatype: string;

  __href__: string;

  'SE-BYPASS': number;

  constructor(payload: any) {
    this.identifier = payload.identifier;
    this.title = payload.title;
    this.text = payload.text;
    this.times = payload.times;
    this.downloads = payload.downloads;
    this.collection = payload.collection;
    this.highlight = new FullTextSearchResponseDocHighlight(payload.highlight);
    this.description = payload.description;
    this.mediatype = payload.mediatype;
    // eslint-disable-next-line no-underscore-dangle
    this.__href__ = payload.__href__;
    this['SE-BYPASS'] = payload['SE-BYPASS'];
  }
}

export class FullTextSearchResponseValueHighlighting {
  text: string[];

  constructor(payload: any) {
    this.text = payload.text;
  }
}

export class FullTextSearchResponseValueFacetCounts {
  facetFields: object;

  facetDates: object;

  constructor(payload: any) {
    this.facetDates = payload.facet_dates;
    this.facetFields = payload.facet_fields;
  }
}

export class FullTextSearchResponseDocHighlight {
  cc: string[];

  constructor(payload: any) {
    this.cc = payload.cc;
  }
}
