# \<scrubber-bar>

> **Deprecated.** This component moved to [@internetarchive/elements](https://github.com/internetarchive/elements) as `<ia-scrubber-bar>` in 0.3.0. It isn't developed here any more, so don't add features or cut a new version from this package. Fix it in elements instead.
>
> It stays published until petabox (WEBDEV-9034) and offshoot (WEBDEV-9033) have migrated off it.

A customizable scrubber bar useful for scrubbing through media.

![Scrubber Bar](./assets/img/scrubber.gif "Scrubber Bar Demo")

## Installation
```bash
yarn add @internetarchive/scrubber-bar
```

## Usage
```js
// scrubber-bar.js
import ScrubberBar from '@internetarchive/scrubber-bar';
export default ScrubberBar;
```

```html
<!-- index.html -->
<script type="module">
  import './scrubber-bar.js';
</script>

<style>
  scrubber-bar {
    --thumbColor: white;
    --thumbBorder: 1px solid white;
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

<scrubber-bar id="scrubberbar"></scrubber-bar>

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
