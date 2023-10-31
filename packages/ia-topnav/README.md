# The top navigation menu component for archive.org

## Update guide
https://git.archive.org/www/offshoot/-/blob/main/guides/update-top-nav.md
## Installation

## Add to your project
```bash
yarn add @internetarchive/ia-topnav
```

## Usage

@see [www/index.html](www/index.html) for the simplest example with all the defaults

* Demo app is in another directory: `/www/index.html`
  * `npm|yarn start` - runs local server in Demo directory which is in `/www` folder
  * you can also just use your preferred server
  * open demo: `http://localhost:8000/www/index.html`

It shows a dynamic change of the logged in user name -- and how it will re-paint the menus.


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
    --grey40: #666;
    --grey28: #474747;
    --grey60: #999;
    --grey66: #aaa;
    --grey80: #ccc;
    --errorYellow: #ffcd27;

    --linkColor: #428bca;
    --linkHoverColor: var(--white);
    --subnavLinkColor: var(--grey66);
    --primaryTextColor: var(--white);
    --inverseTextColor: var(--grey20);
    --lightTextColor: var(--grey60);
    --activeColor: var(--white);
    --activeButtonBg: var(--grey20);
    --iconFill: var(--grey60);

    --searchActiveBg: var(--grey20);
    --searchActiveInputBg: var(--white);
    --searchMenuBg: var(--grey20);
    --desktopSearchIconFill: var(--grey20);

    --mediaMenuBg: var(--grey13);
    --mediaLabelDesktopColor: var(--grey60);
    --activeDesktopMenuIcon: var(--grey28);

    --mediaSliderBg: var(--grey20);
    --mediaSliderDesktopBg: var(--grey28);

    --primaryNavBg: var(--grey13);
    --primaryNavBottomBorder: var(--grey20);

    --desktopSubnavBg: var(--grey20);

    --dropdownMenuBg: var(--grey20);
    --dropdownMenuInfoItem: var(--grey60);
    --dropdownMenuDivider: var(--grey40);

    --loginTextColor: var(--grey60);

    --themeFontFamily: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    --logoWidthTablet: 263px;

    --savePageSubmitBg: var(--grey13);
    --savePageSubmitText: var(--white);
    --savePageInputBorder: var(--grey60);
    --savePageErrorText: var(--errorYellow);

    --topOffset: -1500px;
  }
</style>

<!--
  `baseHost` is the navigation base so leave emtpy for relative links
  `mediaBaseHost` is the base host for media like the profile picture if it's not relative

  NOTE:
  When passing in the `searchQuery` attribute from HTML, not LitElement bindings,
  you must base64 the value to account for any special characters.
-->
<ia-topnav
  baseHost="https://archive.org"
  mediaBaseHost="https://archive.org"
  hideSearch=${true}
  username="shaneriley"
  screenName="long_screen_name_that_gets_truncated"
  searchQuery="J2Zvbyc="
></ia-topnav>
```


**Menus object:**

Please see [src/data/menus.js](the menu objects) for our valid `menus` property.

# Development

## Prerequisite

```bash
yarn install
```

## Start Development Server

```bash
yarn start  // start development server and typescript compiler
```
then open demo - http://localhost:8000/www/index.html

## Testing

```bash
yarn test
```

## Testing via browserstack

```bash
yarn test:bs
```

## Linting

```bash
yarn lint
```
