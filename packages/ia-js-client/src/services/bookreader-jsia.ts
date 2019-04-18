import fetch from 'node-fetch';

// Example
// https://archive.org/bookreader/BookReaderJSLocate.php?id=10_PRINT_121114&subPrefix=10_PRINT_121114

// Actual example
// https://ia802603.us.archive.org/BookReader/BookReaderJSIA.php?id=10_PRINT_121114&itemPath=/4/items/10_PRINT_121114&server=ia802603.us.archive.org&format=jsonp&subPrefix=10_PRINT_121114&version=bHe9koCz

export class BookReaderJsIaService {

  public get (options: {identifier:string, subPrefix?:string}):Promise<any> {
      let fullRequestUrl = `https://www-richard.archive.org/bookreader/BookReaderJSLocate.php?id=${encodeURIComponent(options.identifier)}&subPrefix=${encodeURIComponent(options.subPrefix||'')}&format=json`

      // let fullRequestUrl = await this.fetchFullUrl(options.identifier)
      // console.log(fullRequestUrl)
      return fetch(fullRequestUrl)
        .then(res => res.text())
        .then(body => {
          let raw_response = <any>JSON.parse(body)
          // console.log(raw_response)
          return(raw_response)
        })
        .catch((err) => {
          throw err;
          //TODO-ERRORS callers need to check for this reject, (or at least document that they can also fail) and they aren't doing either currently
          //let empty_reponse = {}
          //rej(empty_reponse) // This is nonsense - shouldn't reject with data, only errors - its a "resolve" if data is substituted, and anyway none of the callers are checking for this reject anyway !
        });
  }
}
