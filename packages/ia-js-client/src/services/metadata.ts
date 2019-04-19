import fetch from 'node-fetch';
const debug = require('debug')('ia-js-client:metadata');

/**
 * This class is a wrapper for raw Metadata JSON responses
 */
export class RawMetadataAPIResponse {
  // This is the data exactly as returned from the metadata API - in particular no check against fulfilling content has been done.
  created:number
  d1:string
  d2:string
  dir:string
  files:Array<any>
  files_count:number
  item_size:number
  metadata:object
  reviews:Array<any>
  server:string
  uniq:number
  workable_servers:Array<string>

  // Other unknown fields (such as the _*.json files)
  [key: string]: any

  constructor (responseData:object) {
    // Assign properties (might be a better way)
    debug(responseData)
    Object.keys(responseData).forEach((property, index) => {
      if (responseData[property]) {
        this[property] = responseData[property]
      }
    })

    // Listify metadata (turn strings literals into single element arrays)
    // SEE https://webarchive.jira.com/browse/PBOX-3073
    for (let property in this.metadata) {
      if (this.metadata[property] instanceof Array === false) {
        this.metadata[property] = [ this.metadata[property] ]
      }
    }
  }

  getSafe (key:string) {
    if (key in this.metadata) {
      return this.metadata[key]
    } else {
      return [null]
    }
  }
}

/**
 * This class is a wrapper for metadata responses
 * NOTE might end up combining Metadata and RawMetadataAPIResponse
 */
export class Metadata {
  readonly data:RawMetadataAPIResponse
  readonly error:boolean = false
  readonly responseCode:number|null = null

  public constructor (data:RawMetadataAPIResponse, error:boolean = false, responseCode:number = null) {
    this.data = data
    this.error = error
    this.responseCode = responseCode
  }

  // Shortcuts for top-level fields
  // TODO (not sure if we need this convenience)
  // get created():number { return this.data.created }
}


export class MetadataService {
  /**
   * The base URL for Archive.org Metadata API
   */
  public API_BASE:string = 'https://archive.org/metadata'

  /**
   * Fetches the full Metadata for an item
   * @param identifier the archive.org identifier
   * @returns Metadata - encapsulation of raw metadata from the API call
   */
  public get (options:{identifier:string}):Promise<Metadata> {
    return fetch(`${this.API_BASE}/${options.identifier}`)
        .then(res => res.text())
        .then(body => {
          let md_response = new RawMetadataAPIResponse(JSON.parse(body))
          let md = new Metadata(md_response)
          return(md);
        })
        .catch((err) => {
          debug("Metadata fetch failed");
          //TODO-ERRORS - note nothing that calls this actually checks whether the promise ended in a rejection ! Each caller has been commented as well.
          throw(err);
          /* It makes no sense to reject(md) can only reject errors
          let md_response = new RawMetadataAPIResponse({})
          let responseCode = 500 // TODO get responseCode
          let md = new Metadata(md_response, true, responseCode)
          reject(md)
           */
        });
  }
}
