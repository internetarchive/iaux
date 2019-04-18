import fetch from 'node-fetch';

// Example
// https://be-api.us.archive.org/mds/v1/get_related/all/diagnosisinterve0000unse

export class RelatedService {

  public API_BASE:string = 'https://be-api.us.archive.org/mds/v1'

  /**
   * Fetches the full Metadata for an item
   * @param identifier the archive.org identifier
   */
  public async get (options: {identifier:string}):Promise<any> {
      fetch(`${this.API_BASE}/get_related/all/${options.identifier}`)
        .then(res => res.text())
        .then(body => {
          let raw_response = JSON.parse(body)
          return(raw_response)
        })
        .catch((err) => {
            throw err;
            // let empty_reponse = { hits: { hits: [] } }
            //reject(empty_reponse) // This is nonsense - shouldn't reject with data, only errors - its a "resolve" if data is substituted, and anyway only current caller is not checking for this reject anyway !
        });
    });
  }
}
