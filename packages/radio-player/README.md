# \<radio-player>

A Radio Player that displays closed captioning and allows searching.

![Radio Player](./assets/img/radio-player.png "Radio Player Demo")

## Installation
```bash
yarn add @internetarchive/radio-player
```

## Usage
```js
// radio-player.js
import RadioPlayer from '@internetarchive/radio-player';
export default RadioPlayer
```

```html
<!-- index.html -->
<script type="module">
  import './radio-player.js';
</script>

<style>
  radio-player {
    line-height: 1.5rem;
    color: white;

    --timeColor: white;
    --timeColumnWidth: 3rem;
    --transcriptHeight: 200px;

    --autoScrollButtonFontColor: black;
    --autoScrollButtonBackgroundColor: white;

    --normalTextColor: gray;
    --activeTextColor: white;
    --searchResultInactiveBorderColor: gray;
    --searchResultActiveBorderColor: green;

    --trackColor: black;
    --trackBorder: 1px solid white;
  }
</style>

<radio-player></radio-player>

<script>
  // Configure the radio player

  const radioPlayer = document.querySelector('radio-player');

  radioPlayer.addEventListener('searchRequested', e => {
    console.log('Search requested', e.detail.searchTerm);
  });

  radioPlayer.addEventListener('searchCleared', e => {
    console.log('Search cleared');
  });

  radioPlayer.addEventListener('playbackPaused', e => {
    console.log('Playback paused');
  });

  radioPlayer.addEventListener('playbackStarted', e => {
    console.log('Playback started');
  });

  radioPlayer.addEventListener('currentTimeChanged', e => {
    console.log('Current time changed', e.detail.currentTime);
  });

  radioPlayer.addEventListener('timeChangedFromScrub', e => {
    console.log('New time', e.detail.newTime);
  });

  radioPlayer.addEventListener('transcriptEntrySelected', e => {
    console.log('New time', e.detail.newTime);
  });

  radioPlayer.addEventListener('canplay', e => {
    console.log('Media can play');
  });

  const quickSearchTerms = [];

  const audioSource = new AudioSource(
    'https://ia803005.us.archive.org/30/items/BBC_Radio_2_20190502_180000/BBC_Radio_2_20190502_180000.mp3',
    'audio/mpeg',
  );

  const radioConfig = new RadioPlayerConfig(
    'Voice of America',
    '7:00pm',
    './logo.jpg',
    './waveform.png',
    [audioSource],
    quickSearchTerms,
  );

  const transcriptEntries: TranscriptEntryConfig[] = [...];

  const transcriptConfig = new TranscriptConfig(transcriptEntries);

  radioPlayer.config = radioConfig;
  radioPlayer.transcriptConfig = transcriptConfig
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
