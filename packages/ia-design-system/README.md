# IA Design System (WIP)

This repository has:
- Design Principles (theory)
- CSS and JavaScript for reusable components

This can be thought of as Internet Archive's own Bootstrap.

Everything contained so far is a work in progress.

Some decisions so far:
- Like Bootstrap, components are just CSS and maybe JS. There is recommended HTML which can be implemented in PHP, React, Web Components, etc.
- ITCSS is used to structure the CSS.
- LESS is used, so that we can easily integrate with existing Petabox code.

## Using in Your Project
It's highly recommended you use Yarn or NPM to install the design system as a dependency, but you may also clone the repository directly into your project.

Yarn/NPM will ensure assets get built by default, but if you clone directly you'll need to run `yarn install && yarn prepare` from inside the `ia-design-system` directory to build assets.

## Importing LESS/CSS
If you're using LESS, just use `@import` rules:
```less
// Import the entire system:
@import 'path/to/node_modules/ia-design-system/src/styles/index.less';

// OR you can import just the parts you need:
@import 'path/to/node_modules/ia-design-system/src/styles/settings.less';
@import 'path/to/node_modules/ia-design-system/src/styles/utils.less';
@import 'path/to/node_modules/ia-design-system/src/styles/generic.less';

// If you're not using Yarn/NPM, just replace the node_modules path with the appropriate path:
@import 'path/to/ia-design-system/src/styles/index.less';
```

If you're using vanilla CSS, pull the built CSS file in via a plain old `<link>` tag:
```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="path/to/node_modules/ia-design-system/public/styles/index.css">

    <!-- If you're not using Yarn/NPM, just replace the node_modules path with the appropriate path: -->
    <link rel="stylesheet" href="path/to/ia-design-system/public/styles/index.css">
  </head>
</html>
```

## Importing JavaScript
From inside your project's JavaScript file, assuming ES2015 or CommonJS:
```js
import IaDesignSystem from 'ia-design-system';

// If you're not using Yarn/NPM, just point the import directly to the file:
import IaDesignSystem from './path/to/ia-design-system/public/scripts/index.js';
```

If you're using ES5 or a module bundler, import it via a plain old `<script>` tag:
```html
<!doctype html>
<html>
  <head>
    <script src="path/to/node_modules/ia-design-system/public/scripts/index.js"></script>

    <!-- If you're not using Yarn/NPM, just replace the node_modules path with the appropriate path: -->
    <script src="path/to/ia-design-system/public/scripts/index.js"></script>
  </head>
</html>
```

## Fractal
This site is built using [Fractal](https://fractal.build/), a tool for building pattern libraries. When developing or modifying components, you can run a local server with Fractal. You can also build a static version of the site for public deployment or archival.

### Contributing
First, install dependencies:

```
yarn install
```

Either perform a one-time asset build:
```
yarn build:assets
```

Or watch your assets so the built files get rebuilt whenever the source files change:
```
yarn watch
```

Then start the local Fractal server. The command will notify you of the URL that the site is served from.
```
yarn start
```

### Building the Static Site
```
yarn install
yarn build:site
```

This will place static files in the `build/` directory. You can copy these out to place on a static web host.

## Contact
For questions and comments, please contact:
- Richard Caceres ([richard@archive.org](mailto:richard@archive.org))
- Evan Minto ([evan@archive.org](mailto:evan@archive.org]))
- Brenton Cheng ([brenton@archive.org](mailto:brenton@archive.org))
