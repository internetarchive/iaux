# \<audio-element>

A LitElement wrapper for the HTML audio element.

![Waveform Progress](./assets/img/audio-element.gif "Waveform Progress Demo")

## Installation
```bash
yarn add @internetarchive/audio-element
```

## Usage
```js
// audio-element.js
import AudioELement from '@internetarchive/audio-element';
export default AudioElement;
```

```html
<!-- index.html -->
<script type="module">
  import './audio-element.js';
</script>

<audio-element></audio-element>

<script>
  const audioElement = document.querySelector('audio-element');

  // set volume
  audioElement.volume = 0.75;

  // set playback rate
  audioElement.playbackRate = 0.5;

  // set audio sources
  audioElement.sources = [
    {url: "./spring.ogg", mimetype: "audio/ogg"}
    {url: "./spring.mp3", mimetype: "audio/mpeg"}
  ]

  // listen for time changes; this updates many times per second as your media plays back
  audioElement.addEventListener('timeupdate', e => {
    console.log('Current time has changed, new value:', e.detail.currentTime);
  });

  // listen for track duration changes like on load
  audioElement.addEventListener('durationchange', e => {
    console.log('Track duration has changed, new value:', e.detail.duration);
  });

  // start playing
  audioElement.play();

  // pause playing
  audioElement.pause();
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
