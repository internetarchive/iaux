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
  public get (options: {identifier:string}):Promise<DetailsResponse> {
      return fetch(`${this.API_BASE}?identifier=${options.identifier}`)
        .then(res => res.text())
        .then(body => {
          let raw_response = <DetailsResponse>JSON.parse(body)
          return(raw_response)
        })
        .catch((err) => {
          //TODO-ERRORS callers of this aren't checking for the reject
          throw err;
          //let empty_reponse = new DetailsResponse()
          //rej(empty_reponse) // This is nonsense - shouldn't reject with data, only errors - its a "resolve" if data is substituted, and anyway only caller isnt checking for this reject anyway !
        });
  }
}
