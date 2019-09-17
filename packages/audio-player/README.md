# \<audio-player>

A customizable scrubber bar useful for scrubbing through media.

![Waveform Progress](./assets/img/audio-player.gif "Waveform Progress Demo")

## Zones of Silence

![Waveform Progress Zones of Silence](./assets/img/zones-of-silence.png "Waveform Progress Zones of Silence")

## Customizable Colors

![Waveform Progress Color Changes](./assets/img/color-modification.png "Waveform Progress Color Changes")

## Installation
```bash
yarn add @internetarchive/audio-player
```

## Usage
```js
// audio-player.js
import WaveformProgress from '@internetarchive/audio-player';
export default WaveformProgress;
```

```html
<!-- index.html -->
<script type="module">
  import './audio-player.js';
</script>

<style>
  audio-player {
    height: 10rem;
    width: 100%;
    --fillColor: #3272b6;
    --zoneOfSilenceColor: orange;
  }
</style>

<audio-player
  id="waveform"
  waveformUrl='./waveform.png'
  interactive=true
></audio-player>

<script>
  const waveformProgress = document.getElementById('waveform');

  // set a value
  waveformProgress.percentComplete = 23;

  // add zones of silence if needed
  waveformProgress.zonesOfSilence = [
    { startPercent: 20, endPercent: 23 },
    { startPercent: 52, endPercent: 57 },
    { startPercent: 73, endPercent: 76 }
  ];

  // listen for value changes
  waveformProgress.addEventListener('valuechange', e => {
    console.log('Value has changed, new value:', e.detail.value);
  });
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
