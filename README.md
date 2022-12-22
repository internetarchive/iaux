![Build Status](https://github.com/internetarchive/iaux/actions/workflows/node.js.yml/badge.svg?branch=master) [![codecov](https://codecov.io/gh/internetarchive/iaux/branch/master/graph/badge.svg)](https://codecov.io/gh/internetarchive/iaux)

# Overview

Here lies a few packages for UI components used on [Archive.org](https://archive.org).

This repo is no longer open to receive new packages.  Please refer to https://github.com/internetarchive/iaux-typescript-wc-template when creating new components.
## Setup

EACH PACKAGE in `/packages` _MUST_ INSTALL ITS OWN DEPS.

Note: we no longer use lerna to manage dependencies nor releases


### Running ia-components (only)
Run our local UI component development environment.
```
cd packages/ia-components && yarn run storybook
```

## Code Structure

There are several node packages in this one repo. They are located under the `packages` directory.

## Publishing

EACH PACKAGE in `/packages` directory manages its own release.

To clarify in the commit/merge, please note package & its new version. ex. ia-components@1.2.3

## Coding rules

This is structured so that there is compatibility with the upstream Archive.org codebase.

#### JS Styleguide
Currently, we are using [Airbnb's styleguide](https://github.com/airbnb/javascript) and will extend accordingly.
We have added [ESLint](https://eslint.org) to help with staying in convention.

## Using StorybookJS

Some packages use [StorybookJS](https://storybook.js.org) to show usage examples of our components.  For details on how to run StorybookJS, visit the `ia-components` readme: [IA Components Readme](/packages/ia-components/README.md)

Run Storybook in ia-components:
```
cd packages/ia-components && yarn run storybook
```

## Unit Testing with JestJS

[JestJS](https://jestjs.io) is pliable enough for us to test in JavaScript and TypeScript.
Try running our tests:
```
cd packages/ia-components && yarn run test
```

## Debugging
We are using the common [debug module](https://www.npmjs.com/package/debug).

To add to a module, add a line like
```
const debug = require('debug')('ia-components:COMPONENTNAME')
```
To enable, for example, debugging in all ia-components, and debugging in the dweb-archive:Nav module.

In Node add a line to your top level application BEFORE requiring or importing the other modules.
```
process.env.DEBUG="ia-components:* dweb-archive:Nav"
```
In Browser, add a line to your index.html or equivalent BEFORE including the bundle.
```
<script type="text/javascript">localStorage.debug = "dweb-archive dweb-archive:* dweb-transports dweb-transports:* dweb-objects dweb-objects:*";</script>
```


## Other

in `v2mocks` there is code that is pulled from IA "View Source" and converted to JSX using this tool:
`https://magic.reactjs.net/htmltojsx.htm`


Archive.org v2 uses [Bootstrap](https://getbootstrap.com) 3.0. Docs can be found here: http://bootstrapdocs.com/v3.0.0/docs/css/#overview

## License

[See our license file.](/LICENSE.md)
