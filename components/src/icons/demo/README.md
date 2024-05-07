# ia-icons: SVG icon library for use in archive.org components

## Usage

```js
import { IAIcon } from './src/ia-icon';
```

```html
<ia-icon icon="close" style="--iconFillColor: #0066cc; --iconStrokeColor: #ffffff;"></ia-icon>
```

```css
ia-icon {
  --iconFillColor: #0066cc;
  --iconStrokeColor: #ffffff;
  --iconWidth: 40px;
  --iconHeight: 40px;
}
```

## Testing

Unit tests are placed in the ./test directory with the suffix and extension
".test.js". Any other JS files in the test directory will be ignored by Karma.
Run the tests with `yarn test`.

## Structure

* index.js - main component export
* index.html - file opened when running `yarn start`
* karma.conf.js - Karma runner config
* karma.bs.conf.js - Karma BrowserStack config. Note that BROWSER_STACK_USERNAME
  and BROWSER_STACK_ACCESS_KEY need to be set as environment variables before
  running.
* /src/ia-icons.js - Class definitions for each LitElement
* /src/icons - Place icon SVGs here. Convention is to export a Lit-html template
* /test - unit tests

## Single Icons

This package is part of [a monorepo](https://github.com/internetarchive/iaux-icons)
that includes a published package for each icon included here. Each package
includes a raw SVG file, a LitHtml template literal, and a defined custom
element created with LitElement.
