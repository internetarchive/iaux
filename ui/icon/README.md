# IA Icons

Lit WebComponent small SVG based archive.org icons.

This repo builds JS sources, tests, and test pages, from a subdirectory of svg files:

[svg/](svg/)


## Importing

Each `.svg` source file can then be individually imported via JS/TS like:
```js
import twitter from 'https://esm.archive.org/@iaux/icon/twitter'
```

You can use in markup with the lit / web components definition like:
```html
<ia-icon-video></ia-icon-video>
<script type="module" src="https://esm.archive.org/@iaux/icon/video"></script>
```

Each icon `.js` file defines an `<ia-icon>` `LitElement` web component.
---

You can also import *all* icons at once like:
```js
import { share, twitter } from 'https://esm.archive.org/@iaux/icon'
```
-OR-

```html
<ia-icon-video></ia-icon-video>
<script type="module" src="https://esm.archive.org/@iaux/icon"></script>
```
---


## Demo Pages

- [test/](test/)
- [test/all.html](test/all.html)
- [test/live-single.html](test/live-single.html)
- [test/live-all.html](live-all.html)
---


## Updating

Please run:
```sh
./bin/build.sh
```
in a `git clone` of this repo to rebuild/update [src/](src/) and [test/](test/) files.

You can add a new (or change an existing) `.svg` file in the [svg/](svg/) subdir.

Running the [bin/build.sh](bin/build.sh) script will automatically create (or update)
the relevant JS and test files.

## Publishing

When ready to publish an update, `cd` to this directory and:
```sh
npm version
# note ^ version
# edit package.json to a newer version

npm run prepubish
# make sure all runs ok

npm publish

# you should git commit & push package.json and anything else now
```
