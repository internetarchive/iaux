# \<waveform-progress>

A customizable scrubber bar useful for scrubbing through media.

![Scrubber Bar](./assets/img/scrubber.gif "Scrubber Bar Demo")

## Installation
```bash
yarn add @internetarchive/waveform-progress
```

## Usage
```js
// waveform-progress.js
import ScrubberBar from '@internetarchive/waveform-progress';
export default ScrubberBar;
```

```html
<!-- index.html -->
<script type="module">
  import './waveform-progress.js';
</script>

<style>
  waveform-progress {
    --thumbColor: white;
    --thumbBorder: 1px solid black;
    --trackFillColor: blue;
    --trackColor: purple;
    --trackBorder: 1px solid black;
    --trackBorderRadius: 5px;
    --trackHeight: 10px;
    --thumbDiameter: 20px;
    --scrubberBarHeight: 20px;
    --thumbBorderRadius: 10px;
    --webkitThumbTopMargin: -6px;
  }
</style>

<waveform-progress id="scrubberbar"></waveform-progress>

<script>
  const scrubberBar = document.getElementById('scrubberbar');

  // listen for value changes
  scrubberBar.addEventListener('valuechange', e => {
    console.log('Value has changed, new value:', e.detail.value);
  });

  // set a different value
  scrubberBar.value = 23;
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
