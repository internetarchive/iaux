# \<playback-controls>

A customizable scrubber bar useful for scrubbing through media.

![Scrubber Bar](./assets/img/scrubber.gif "Scrubber Bar Demo")

## Installation
```bash
yarn add @internetarchive/playback-controls
```

## Usage
```js
// playback-controls.js
import PlaybackControls from '@internetarchive/playback-controls';
export default PlaybackControls;
```

```html
<!-- index.html -->
<script type="module">
  import './playback-controls.js';
</script>

<style>
  playback-controls {
    --thumbColor: white;
    --thumbBorder: 1px solid black;
    --trackFillColor: blue;
    --trackColor: purple;
    --trackBorder: 1px solid black;
    --trackBorderRadius: 5px;
    --trackHeight: 10px;
    --thumbDiameter: 20px;
    --PlaybackControlsHeight: 20px;
    --thumbBorderRadius: 10px;
    --webkitThumbTopMargin: -6px;
  }
</style>

<playback-controls id="PlaybackControls"></playback-controls>

<script>
  const PlaybackControls = document.getElementById('PlaybackControls');

  // listen for value changes
  PlaybackControls.addEventListener('valuechange', e => {
    console.log('Value has changed, new value:', e.detail.value);
  });

  // set a different value
  PlaybackControls.value = 23;
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
