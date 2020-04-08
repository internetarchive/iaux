# \<playback-controls>

Playback controls for playing media.

![Playback Controls](./assets/img/playback-controls.png "Playback Controls Demo")

## Installation
```bash
yarn add @internetarchive/playback-controls
```

## Usage
```js
// playback-controls.js
import { PlaybackControls, PlaybackMode } from '@internetarchive/playback-controls';
export default { PlaybackControls, PlaybackMode };
```

```html
<!-- index.html -->
<script type="module">
  import { PlaybackControls, PlaybackMode } from './playback-controls.js';
</script>

<playback-controls id="playbackControls"></playback-controls>

<script>
  const playbackControls = document.getElementById('playbackControls');

  playbackControls.addEventListener('back-button-pressed', e => {
    console.log('Back button pressed');
  });

  playbackControls.addEventListener('play-pause-button-pressed', e => {
    console.log('Play pause button pressed');
  });

  playbackControls.addEventListener('forward-button-pressed', e => {
    console.log('Forward button pressed');
  });

  // set a different state
  playbackControls.playbackMode = PlaybackMode.playing; // or PlaybackMode.paused
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
