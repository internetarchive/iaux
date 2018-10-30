import fetch from 'node-fetch';

// Example
// https://archive.org/~richard/details-api/index.php?identifier=cd_alone-together_charlie-haden-lee-konitz-brad-mehldau


export class DetailsResponse {
  /**
   * Used for audio and video. Contains the initialization data
   */
  jwInitData:null|Array<{
    title:string
    orig:string
    image:string // the waveform
    duration:number
    sources:Array<{
      file:string
      type:string // eg mp3
      height:string|number
      width:string|number
    }>
  }>


  theatreMainImageUrl:null|string

  viewCount:number
}

export class DetailsService {
  public API_BASE:string = 'https://archive.org/~richard/details-api/index.php'

  /**
   * Fetches the details page data
   * @param identifier the archive.org identifier
   */
  public async get (options: {identifier:string}):Promise<DetailsResponse> {
    return new Promise<DetailsResponse>((resolve, reject) => {
      fetch(`${this.API_BASE}?identifier=${options.identifier}`)
        .then(res => res.text())
        .then(body => {
          let raw_response = <DetailsResponse>JSON.parse(body)
          resolve(raw_response)
        })
        .catch(() => {
          let empty_reponse = new DetailsResponse()
          reject(empty_reponse)
        });
    });
  }
}
