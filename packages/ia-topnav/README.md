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
    --grey13: #222;
    --grey20: #333;
    --grey28: #474747;
    --grey999: #999;
    --grey80: #ccc;
    --black: #000;
    --link-color: #428bca;
    --subnavLinkColor: #aaa;
    --primary-text-color: var(--white);
    --theme-font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    --logoWidthTablet: 263px;
  }
</style>

<ia-topnav></ia-topnav>
```

Config object:

```js
{
  baseUrl: "archive.org", // domain used to build most links
  waybackUrl: "web.archive.org", // domain used for Wayback search
  screenName: "really_long_screen_name_that_may_be_truncated_on_mobile", // full screen name displayed in user menu
  username: "shaneriley", // short user name used for desktop nav and some link building
  eventCategory: "MobileTopNav" // Google Analytics event category
}
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
