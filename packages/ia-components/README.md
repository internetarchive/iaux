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