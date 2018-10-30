## Background

Monorepo for Archive.org UX development and prototyping.

There are multiple npm packages in this repo, and [Lerna](https://lernajs.io) is used to manage them.

## Setup

Install dependencies on all packages.

```
yarn install
yarn run lerna bootstrap
```


Prototypes can be run like this:

```
cd packages/prototypes
yarn run parcel prototypes/details-react/index.html
```

The tool [Parcel](https://parceljs.org) is for convenience.


# Coding rules

This is structured so that there is compatibility with the upstream Archive.org codebase.

So the following must be followed:
- Use `less` instead of `scss`
- Do not import other asset types into js code. Eg do NOT do `import 'styles.less'. Instead, create a separate less file, eg 'styles.less' alongside the JavaScript code, and this will be imported into the petabox's archive.less at integration time.



## Other

in v2mocks there is code that is pulled form IA view source and converted to JSX using this tool:
`https://magic.reactjs.net/htmltojsx.htm`


Archive.org v2 uses bootstrap 3.0. Docs can be found here: http://bootstrapdocs.com/v3.0.0/docs/css/#overview
