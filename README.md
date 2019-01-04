# Overview

Monorepo for Archive.org UX development and prototyping.

There are multiple npm packages in this repo, and [Lerna](https://lernajs.io) is used to manage them.


## Code Structure

There are several node packages in this one repo. They are located under the "packages" directory.

At the time of writing, there are 4 packages:

### ia-components

The `ia-components` package contains reusable "components" (loosely). It is actually just a package that is included into Archive.org's codebase. Having an external package, makes it easier for new developers to contribute development.

It's easy to test these components out using the "prototypes" package. The final intergration into the Archive.org website still needs to be done by internal staff.

As a convention, the preferred framework is React, but vanilla JS components are also possible.

Within `ia-components` there are two subdirectories: `sandbox` and `live`. The idea is that code in the `live` directory is used in production. But in `sandbox`, components might still be works in progress, new designs, etc, and only used in prototypes.

### ia-design-system

This is still a TODO, but the idea is common CSS and a design style guide could live here.

### ia-js-client

The `ia-js-client` package is a hybrid JavaScript and NodeJS client to the Internet Archive's APIs. It is written in TypeScript. It is used in both the `ia-components` and `ia-prototype-apps` packages for fetching data. See [packages/ia-js-client/README.md](packages/ia-js-client/README.md) for more info.

### ia-prototype-apps

Prototypes are basically little websites built using code from `ia-components`. They can serve many purposes. For example, a prototype can be used to test the integration of several components in `ia-components`. A prototype can also be made by the UX team to test a new design using live data.

Of course, a prototype could also be made outside of this repo, and that will make sense in some cases.

Since the prototypes package is a "packages/prototypes" and there are a lot of other files at that level, there is a second directory "packages/prototypes/prototypes" and this is where the actual content lives.

See [packages/ia-prototype-apps/README.md](packages/ia-prototype-apps/README.md) for more info.



## Setup

Install dependencies on all packages.

```
yarn install
yarn run lerna bootstrap
yarn run lerna link
```


Prototypes can be run like this:

```
cd packages/prototypes
yarn run parcel prototypes/examples/example-hello/index.html
```

After you can try running a more complex example.
```
yarn run parcel prototypes/details-react/index.html
```


## Coding rules

This is structured so that there is compatibility with the upstream Archive.org codebase.

#### Base rules:
- Use `less` instead of `scss`
- Do not import other asset types into js code. Eg do NOT do `import 'styles.less'. Instead, create a separate less file, eg 'styles.less' alongside the JavaScript code, and this will be imported into the petabox's archive.less at integration time.

#### JS Styleguide
Currently, we are using Airbnb's styleguide and will extend accordingly.
We have added ESLINT to help with staying in convention.

## Using StorybookJS

We use StorybookJS to show usage examples of our components.  For details on how to run StorybookJS, visit the `ia-components` readme: [IA Components Readme](/packages/ia-components/README.md)

Run Storybook:
```
cd packages/ia-components && yarn run storybook
```

## Other

in v2mocks there is code that is pulled form IA view source and converted to JSX using this tool:
`https://magic.reactjs.net/htmltojsx.htm`


Archive.org v2 uses bootstrap 3.0. Docs can be found here: http://bootstrapdocs.com/v3.0.0/docs/css/#overview
