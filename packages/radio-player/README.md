# \<radio-player>

A transcript view that handles closed captioning and search results.

![Transcript View](./assets/img/radio-player.gif "Transcript View Demo")

## Installation
```bash
yarn add @internetarchive/radio-player
```

## Usage
```js
// radio-player.js
import RadioPlayer from '@internetarchive/radio-player';
export default RadioPlayer;
```

```html
<!-- index.html -->
<script type="module">
  import './radio-player.js';
</script>

<style>
  radio-player {
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

<radio-player
  currentTime=10
  showContextZones=true
  topContextHeight=50
  bottomContextHeight=50
  selectedSearchResultIndex=1
  .entries=${transcript}>
</radio-player>

<script>
  const radioPlayer = document.querySelector('radio-player');

  // change the current time and the transcript view
  // will scroll to the proper entry
  radioPlayer.currentTime = 50;
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
