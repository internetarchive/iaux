# \<transcript-view>

A customizable scrubber bar useful for scrubbing through media.

![Transcript View](./assets/img/transcript-view.gif "Transcript View Demo")

## Installation
```bash
yarn add @internetarchive/transcript-view
```

## Usage
```js
// transcript-view.js
import TranscriptView from '@internetarchive/transcript-view';
export default TranscriptView;
```

```html
<!-- index.html -->
<script type="module">
  import './transcript-view.js';
</script>

<style>
  transcript-view {
    display: block;
    --timeColor: white;
    --timeColumnWidth: 5rem;
    --transcriptHeight: 200px;

    --autoScrollButtonFontColor: black;
    --autoScrollButtonBackgroundColor: white;

    --normalTextColor: gray;
    --activeTextColor: white;
    --searchResultInactiveBorderColor: gray;
    --searchResultActiveBorderColor: green;
  }
</style>

<transcript-view
  currentTime=10
  showContextZones=true
  topContextHeight=50
  bottomContextHeight=50
  selectedSearchResultIndex=1
  .entries=${transcript}>
</transcript-view>

<script>
  const transcriptView = document.querySelector('transcript-view');

  // change the current time and the transcript view
  // will scroll to the proper entry
  transcriptView.currentTime = 50;
</script>

```

# Development

## Prerequisite
```bash
yarn install
```

## Start Development Server
```bash
yarn start  // start development server and typescript compiler
```

## Testing
```bash
yarn test
```

## Testing via browserstack
```bash
yarn test:bs
```

## Demoing using storybook
```bash
yarn storybook
```

## Linting
```bash
yarn lint
```
