# \<transcript-view>

A customizable scrubber bar useful for scrubbing through media.

![Scrubber Bar](./assets/img/scrubber.gif "Scrubber Bar Demo")

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
    --thumbColor: white;
    --thumbBorder: 1px solid black;
    --trackFillColor: blue;
    --trackColor: purple;
    --trackBorder: 1px solid black;
    --trackBorderRadius: 5px;
    --trackHeight: 10px;
    --thumbDiameter: 20px;
    --transcriptViewHeight: 20px;
    --thumbBorderRadius: 10px;
    --webkitThumbTopMargin: -6px;
  }
</style>

<transcript-view id="scrubberbar"></transcript-view>

<script>
  const transcriptView = document.getElementById('scrubberbar');

  // listen for value changes
  transcriptView.addEventListener('valuechange', e => {
    console.log('Value has changed, new value:', e.detail.value);
  });

  // set a different value
  transcriptView.value = 23;
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
