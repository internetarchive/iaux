This is a repo for Archive.org components.

Some are for production, but others are for prototyping.

This repo is installed into the archive.org codebase, and components are selectively used (not all are inculded).

## Using StorybookJS

We use Storybook to show usage examples of our components.

To run storybook, do the following inside of this directory:

1) install dependencies using one of the following: `yarn install` OR `lerna bootstrap` (if you are devving on monorepo)

2) `npm run storybook`


#### Current Storybook Add-ons:

- [A11y](https://github.com/storybooks/storybook/tree/master/addons/a11y) - checks whether or not the component has ally
- [JSX](https://github.com/storybooks/addon-jsx) - shows component's JSX
- [Knobs](https://github.com/storybooks/storybook/tree/master/addons/knobs) - allows you to toggle a component's props/variables in the Storybook interface

### Testing with JestJS

JestJS gives us flexibility to test not only our React components, but our JavaScript & Typescript as well.  In this repo, it will be mainly for unit testing our UI components.

To run tests in the terminal:
```
yarn run test
```

To run tests in the Storybook UI:
```
yarn run storybook
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

