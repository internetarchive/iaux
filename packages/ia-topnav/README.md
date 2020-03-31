# \<ia-topnav>

The top navigation menu for archive.org

## Installation

```bash
yarn add @internetarchive/ia-topnav
```

## Usage

```js
// ia-top-nav.js
import IATopNav from '@internetarchive/ia-topnav';
export default IATopNav;
```

```html
<!-- index.html -->
<script type="module">
  import './ia-topnav.js';
</script>

<style>
  /* Defaults */
  ia-topnav {
    --white: #fff;
    --grey20: #333;
    --grey999: #999;
    --black: #000;
    --link-color: #428bca;
    --primary-text-color: var(--white);
    --theme-font-family: 'Helvetica Neue';
  }
</style>

<ia-topnav></ia-topnav>
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
