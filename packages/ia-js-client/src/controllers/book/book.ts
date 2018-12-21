import { MetadataService, Metadata } from '../../services/metadata'
import { DetailsService, DetailsResponse } from '../../services/details'
import { Item } from '../item/item';


export class BookController {
  // TODO
  // will be able to get info needed to initialize bookreader, etc
  item:Item

  constructor (item:Item) {
    this.item = item
  }

  // public async getMetadata ():Promise<Metadata> {
  //   return new Promise<Metadata>(async (resolve, reject) => {
  //     if (this.metadataCache) {
  //       resolve(this.metadataCache)
  //     } else {
  //       let metadataService = new MetadataService()
  //       this.metadataCache = await metadataService.get({identifier: this.identifier})
  //       resolve(this.metadataCache)
  //     }
  //   })
  // }

}