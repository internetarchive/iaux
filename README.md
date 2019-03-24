# Overview

Monorepo for [Archive.org](https://archive.org) UX development and prototyping.

**Note:** This is work-in-progress code, and until development has stabilized, things may change a lot. This library is being published with our use cases in mind and is not necessarily meant to be consumed by the broader public.

There are multiple npm packages in this repo, and [Lerna](https://lernajs.io) is used to manage them.


## Setup

Install dependencies on all packages.

```
yarn install
yarn run lerna bootstrap
yarn run lerna link
```

### Running ia-components
Run our local UI component development environment.
```
cd packages/ia-components && yarn run storybook

```

## Code Structure

There are several node packages in this one repo. They are located under the `packages` directory.

At the time of writing, there are 4 packages:

### ia-components

The `ia-components` package contains reusable "components" (loosely). It is actually just a package that is included into Archive.org's codebase. Having an external package makes it easier for new developers to contribute development.

It's easy to test these components using the "prototypes" package. The final integration into the Archive.org website still needs to be done by internal staff.

As a convention, the preferred framework is React, but vanilla JS components are also possible.

Within `ia-components` there are two subdirectories: `sandbox` and `live`. The idea is that code in the `live` directory is used in production. But in `sandbox`, components might still be works-in-progress, new designs, etc, and only used in prototypes.

### ia-design-system

This is still a TODO, but the idea is that common CSS and a design style guide could live here.

### ia-js-client

The `ia-js-client` package is a hybrid JavaScript and NodeJS client to the Internet Archive's APIs. It is written in TypeScript. It is used in both the `ia-components` and `ia-prototype-apps` packages for fetching data. See [packages/ia-js-client/README.md](packages/ia-js-client/README.md) for more info.

### ia-prototype-apps

Prototypes are basically little websites built using code from `ia-components`. They can serve many purposes. For example, a prototype can be used to test the integration of several components in `ia-components`. A prototype can also be made by the UX team to test a new design using live data.

Of course, a prototype could also be made outside of this repo, and that will make sense in some cases.

Since the prototypes package is a "packages/prototypes" and there are a lot of other files at that level, there is a second directory "packages/prototypes/prototypes" and this is where the actual content lives.

See [packages/ia-prototype-apps/README.md](packages/ia-prototype-apps/README.md) for more info.


Prototypes can be run like this:
```
cd packages/prototypes
yarn run parcel prototypes/examples/example-hello/index.html
```

After, you can try running a more complex example:
```
yarn run parcel prototypes/details-react/index.html
```

## Publishing

As stated earlier, there are multiple npm packages in this repo, and [Lerna](https://lernajs.io) is used to manage them. The command used to publish changes is the following:

```
yarn run lerna publish --skip-git --canary
```

This will provide a step-by-step prompt, where you can decide whether this is a major, minor, or patch release. It's okay to try it, and then use control+c, to exit without having changes. However, once you publish a release, it's irrevocable.


## Coding rules

This is structured so that there is compatibility with the upstream Archive.org codebase.

#### Base rules:
- Use `less` instead of `scss`
- Do not import other asset types into js code. E.g. do NOT do `import 'styles.less'`. Instead, create a separate `less` file, e.g. `styles.less` alongside the JavaScript code, and this will be imported into the petabox's `archive.less` at integration time.

#### JS Styleguide
Currently, we are using [Airbnb's styleguide](https://github.com/airbnb/javascript) and will extend accordingly.
We have added [ESLint](https://eslint.org) to help with staying in convention.

## Using StorybookJS

We use [StorybookJS](https://storybook.js.org) to show usage examples of our components.  For details on how to run StorybookJS, visit the `ia-components` readme: [IA Components Readme](/packages/ia-components/README.md)

Run Storybook:
```
cd packages/ia-components && yarn run storybook
```

## Unit Testing with JestJS

[JestJS](https://jestjs.io) is pliable enough for us to test in JavaScript and TypeScript.
Try running our tests:
```
cd packages/ia-components && yarn run test
```

## Other

in `v2mocks` there is code that is pulled from IA "View Source" and converted to JSX using this tool:
`https://magic.reactjs.net/htmltojsx.htm`


Archive.org v2 uses [Bootstrap](https://getbootstrap.com) 3.0. Docs can be found here: http://bootstrapdocs.com/v3.0.0/docs/css/#overview
