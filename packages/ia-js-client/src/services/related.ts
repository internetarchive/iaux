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
    return new Promise<any>((resolve, reject) => {
      fetch(`${this.API_BASE}/get_related/all/${options.identifier}`)
        .then(res => res.text())
        .then(body => {
          let raw_response = JSON.parse(body)
          resolve(raw_response)
        })
        .catch(() => {
          let empty_reponse = {
            hits: {
              hits: []
            }
          }
          reject(empty_reponse)
        });
    });
  }
}
