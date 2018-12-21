# Prototypes

Prototypes are basically little websites built using code from `ia-components`. They can serve many purposes. For example, a prototype can be used to test the integration of several components in `ia-components`. A prototype can also be made by the UX team to test a new design using live data.

Of course, a prototype could also be made outside of this repo, and that will make sense in some cases.

Since the prototypes package is a "packages/prototypes" and there are a lot of other files at that level, there is a second directory "packages/prototypes/prototypes" and this is where the actual content lives.

Prototypes are run using [Parcel](https://parceljs.org). This means only one npm install is needed and all the prototypes use the same node_modules. Eg it's more light-weight this way.


## Example usage

Running a prototype

```
yarn run parcel prototypes/details-react/index.html
```


Building a prototype

```
yarn run parcel build prototypes/details-react/index.html --public-url ./
```

This can then be uploaded somewhere for shared.