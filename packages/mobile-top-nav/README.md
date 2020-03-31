# \<topnav-element>

The mobile navigation menu for archive.org

## Installation

```bash
yarn add @internetarchive/mobile-top-nav
```

## Usage

```js
// ia-mobile-top-nav.js
import IAMobileTopNav from '@internetarchive/mobile-top-nav';
export default IAMobileTopNav;
```

```html
<!-- index.html -->
<script type="module">
  import './ia-mobile-top-nav.js';
</script>

<style>
  /* Defaults */
  topnav-element {
    --white: #fff;
    --grey20: #333;
    --grey999: #999;
    --black: #000;
    --link-color: #428bca;
    --primary-text-color: var(--white);
    --theme-font-family: 'Helvetica Neue';
  }
</style>

<topnav-element></topnav-element>
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
