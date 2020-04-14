# Internet Archive Search Service

A service for searching and retrieving metadata from the Internet Archive.

## Installation
```bash
yarn add @internetarchive/ia-search-service
```

## Usage

### 1. Implement a SearchBackend

In order to abstract the network connectivity layer and the environment-specific configuration from the result handling, the consumer should implement a search backend that implements the `SearchBackendInterface`.

There are just two methods, one for fetching search results and the other for fetching metadata. They both return a `Promise` that should contain JSON that matches a `SearchResponse` object or a `MetadataResponse` object.

#### Example Search Backend

```ts
// search-backend.ts
import { SearchBackendInterface, SearchResponse, MetadataResponse } from '@internetarchive/ia-search-service';

export class SearchBackend implements SearchBackendInterface {
  constructor(baseUrl = 'archive.org') {
    this.baseUrl = baseUrl;
  }

  async performSearch(params): Promise<SearchResponse> {
    const urlSearchParam = params.asUrlSearchParams;
    const queryAsString = urlSearchParam.toString();
    const url = `https://${this.baseUrl}/advancedsearch.php?${queryAsString}`;
    const response = await fetch(url);
    const json = await response.json();
    return new Promise(resolve => resolve(json));
  }

  async fetchMetadata(identifier): Promise<MetadataResponse> {
    const url = `https://${this.baseUrl}/metadata/${identifier}`;
    const response = await fetch(url);
    const json = await response.json();
    return new Promise(resolve => resolve(json));
  }
}
```

### 2. Make Search Requests

Using the backend you created above, instantiate a `SearchService` with it, craft some `SearchParams`, and perform your search:

#### Example

```ts
// search-consumer.ts
import { SearchService, SearchParams, SearchResponse } from '@internetarchive/ia-search-service';
import { SearchBackend } from './search-backend';

...

const searchBackend = new SearchBackend();
const searchService = new SearchService(searchBackend);

const params = new SearchParams('collection:books AND title:(little bunny foo foo)');
params.sort = 'downloads desc';
params.rows = 33;
params.start = 0;
params.fields = ['identifier', 'collection', 'creator', 'downloads'];

const searchResponse: SearchResponse = await searchService.performSearch(params);
searchResponse.response.numFound // => number
searchResponse.response.docs // => Metadata[] array
searchResponse.response.docs[0].identifier // => 'identifier-foo'

const metadataResponse: MetadataResponse = await searchService.fetchMetadata('some-identifier');
metadataResponse.metadata.identifier // => 'some-identifier'
metadataResponse.metadata.collection.value // => 'some-collection'
metadataResponse.metadata.collection.values // => ['some-collection', 'another-collection', 'more-collections']
```

## Metadata Values

Internet Archive Metadata is expansive and nearly all metadata fields can be returned as either an array, string, or number.

The Search Service handles all of the possible variations in data formats and converts them to native types. For instance on date fields, like `date`, it takes the string returned and converts it into a native javascript `Date` value. Similarly for duration-type fields, like `length`, it takes the duration, which can be seconds `324.34` or `hh:mm:ss.ms` and converts them to a `number` in seconds.

There are parsers for several different field types, like `Number`, `String`, `Date`, and `Duration` and others can be added for other field types.

See `src/models/metadata-fields/field-types.ts`

### Usage

```ts
metadata.collection.value // return just the first item of the `values` array, ie. 'my-collection'
metadata.collection.value // returns all values of the array, ie. ['my-collection', 'other-collection']
metadata.collection.rawValue // return the rawValue. This is useful for inspecting the raw response received.

metadata.date.value  // return the date as a javascript `Date` object

metadata.length.value  // return the length (duration) of the item as a number of seconds, can be in the format "hh:mm:ss" or decimal seconds
```

# Development

## Prerequisite
```bash
yarn install
```

## Testing
```bash
yarn test
```

## Linting
```bash
yarn lint
```
