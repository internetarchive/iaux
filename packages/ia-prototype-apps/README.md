# Prototypes

Prototypes are basically little websites built using code from `ia-components`. They can serve many purposes. For example, a prototype can be used to test the integration of several components in `ia-components`. A prototype can also be made by the UX team to test a new design using live data.

Of course, a prototype could also be made outside of this repo, and that will make sense in some cases.

Since the prototypes package is a "packages/prototypes" and there are a lot of other files at that level, there is a second directory "packages/prototypes/prototypes" and this is where the actual content lives.

Prototypes are run using [Parcel](https://parceljs.org). This means only one npm install is needed and all the prototypes use the same node_modules. Eg it's more light-weight this way.


## Example usage

Running a prototype

```
yarn run parcel apps/details-react/index.html
```


Building a prototype

```
yarn run parcel build apps/details-react/index.html --public-url ./
```

This can then be uploaded somewhere for shared.

Note: All these commands have to be run from the root directory of `ia-prototype-apps`, i.e. `/iaux/packages/ia-prototype-apps`.

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

