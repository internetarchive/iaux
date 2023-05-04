# IA Icons

This repo builds JS source, tests, and test pages, from a subdirectory of svg files:

[svg/](svg/)

Each `.svg` source file can then be individually imported via JS/TS like:
```js
import twitter from 'https://esm.archive.org/@internetarchive/ia-icons/src/twitter.js'
```

You can use in markup with the lit / web components definition like:
```html
<ia-icon-video></ia-icon-video>
<script type="module" src="https://esm.archive.org/@internetarchive/ia-icons/src/video.js"></script>
```

Each icon `.js` file defines an `<ia-icon>` `LitElement` web component.

## Demo Page
**[test/](test/)**

## Updating

Please run:
```sh
./bin/build.sh
```
in a `git clone` of this repo to rebuild/update [src/](src/) and [test/](test/) files.

You can add a new (or change an existing) `.svg` file in the [svg/](svg/) subdir.

Running the [bin/build.sh](bin/build.sh) script will automatically create (or update)
the relevant JS and test files.

