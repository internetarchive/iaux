import { MetadataService, Metadata } from '../../services/metadata'
import { DetailsService, DetailsResponse } from '../../services/details'

/**
 * early prototype of audio file class (will change)
 */
export class AudioFile {
  name:string
  length:number
  track:string
  artist:string
  sources:Array<{
    file:string
    type:string // eg mp3
    height:string|number
    width:string|number
  }>
  waveformUrl:string
  youtubeId:string
  spotifyId:string

  constructor (file?:any) {
    if (file) this.setFromFile(file)
  }

  setFromFile (file:any) {
    // console.log(file)
    this.name = file.title
    this.track = file.track
    this.length = file.length
    this.artist = file.artist || ''

    let externalIdentifiers:Array<string> = []
    switch (typeof file['external-identifier']) {
      case 'string':
        externalIdentifiers.push(file['external-identifier'])
        break
      case 'object':
        externalIdentifiers.push(...file['external-identifier'])
        break
    }

    externalIdentifiers.forEach((id) => {
      if (id.indexOf('urn:youtube') === 0) {
        this.youtubeId = id.replace('urn:youtube:', '')
      } else if (id.indexOf('urn:spotify') === 0) {
        this.spotifyId = id.replace('urn:spotify:track:', '')
      }
    })
  }
}

// Maybe this would abstract a bunch of services
// Using async in most functions, means it might have different strategies
// for fetching data.

export class Item {
  readonly identifier:string

  private metadataCache:Metadata
  private detailsDataCache:DetailsResponse|null

  constructor (identifier:string, metadata?:Metadata) {
    this.identifier = identifier
    this.metadataCache = metadata
    this.detailsDataCache = null
  }

  public async getMetadata ():Promise<Metadata> {
    return new Promise<Metadata>(async (resolve, reject) => {
      if (this.metadataCache) {
        resolve(this.metadataCache)
      } else {
        let metadataService = new MetadataService()
        this.metadataCache = await metadataService.get({identifier: this.identifier})
        resolve(this.metadataCache)
      }
    })
  }

  public async getMetadataField (field:string, safe:boolean):Promise<Array<any>|null> {
    return new Promise<Array<any>|null>(async (resolve, reject) => {
      let md = await this.getMetadata()
      let value = md.data.metadata[field] || null
      if (!value && safe) {
        value = [null]
      }
      resolve(md.data[field] || value)
    })
  }

  public async getDetailsData ():Promise<DetailsResponse> {
    return new Promise<DetailsResponse>(async (resolve, reject) => {
      if (this.detailsDataCache) {
        resolve(this.detailsDataCache)
      } else {
        let detailsService = new DetailsService()
        this.detailsDataCache = await detailsService.get({identifier: this.identifier})
        resolve(this.detailsDataCache)
      }
    })
  }

  public async getAudioTracks ():Promise<Array<AudioFile>> {
    return new Promise<Array<AudioFile>>(async (resolve, reject) => {
      let metadata = await this.getMetadata()
      let detailsResponse = await this.getDetailsData()

      // TODO
      let audioFiles = []
      if (detailsResponse.jwInitData) {
        console.log(detailsResponse.jwInitData)
        // parse the audio files
        detailsResponse.jwInitData.forEach(jwRow => {
          let file = metadata.data.files.reduce((carry, file) => {
            if (carry)
              return carry
            if (file.name == jwRow.orig) {
              return file
            }
          }, null)

          let audioFile = new AudioFile(file)


          audioFile.name = jwRow.title.replace(/^(\d+\. )/, '')
          audioFile.waveformUrl = jwRow.image
          audioFile.length = jwRow.duration
          console.log('setting sources')
          audioFile.sources = jwRow.sources

          // TODO get youtubeId and spotifyId  from metadata files
          // youtubeId:string
          // spotifyId:string

          audioFiles.push(audioFile)
        })
      }

      resolve(audioFiles)
    })
  }
}