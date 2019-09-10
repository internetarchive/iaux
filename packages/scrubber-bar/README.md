# \<scrubber-bar>

A customizable scrubber bar useful for scrubbing through media.

![Scrubber Bar](./assets/img/scrubber.gif "Scrubber Bar Demo")

## Installation
```bash
yarn add @internetarchive/scrubber-bar
```

## Usage
```html
<script type="module">
  import '@internetarchive/scrubber-bar/index.js';
</script>

<style>
  scrubber-bar {
    --thumbColor: 'white';
    --thumbBorder: '1px solid black';
    --trackFillColor: 'blue';
    --trackColor: 'purple';
    --trackBorder: '1px solid black';
    --trackBorderRadius: '5px';
    --trackHeight: '10px';
    --thumbDiameter: '20px';
    --scrubberBarHeight: '20px';
    --thumbBorderRadius: '10px';
    --webkitThumbTopMargin: '-6px';
  }
</style>

<scrubber-bar></scrubber-bar>
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
