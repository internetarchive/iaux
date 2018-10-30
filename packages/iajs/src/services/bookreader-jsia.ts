import fetch from 'node-fetch';

// Example
// https://archive.org/bookreader/BookReaderJSLocate.php?id=10_PRINT_121114&subPrefix=10_PRINT_121114

// Actual example
// https://ia802603.us.archive.org/BookReader/BookReaderJSIA.php?id=10_PRINT_121114&itemPath=/4/items/10_PRINT_121114&server=ia802603.us.archive.org&format=jsonp&subPrefix=10_PRINT_121114&version=bHe9koCz

export class BookReaderJsIaService {

  public async get (options: {identifier:string, subPrefix?:string}):Promise<any> {
    return new Promise<any>(async (res, rej) => {
      let fullRequestUrl = `https://www-richard.archive.org/bookreader/BookReaderJSLocate.php?id=${encodeURIComponent(options.identifier)}&subPrefix=${encodeURIComponent(options.subPrefix||'')}&format=json`

      // let fullRequestUrl = await this.fetchFullUrl(options.identifier)
      // console.log(fullRequestUrl)
      fetch(fullRequestUrl)
        .then(res => res.text())
        .then(body => {
          let raw_response = <any>JSON.parse(body)
          // console.log(raw_response)
          res(raw_response)
        })
        .catch(() => {
          let empty_reponse = {}
          rej(empty_reponse)
        });
    });
  }
}
