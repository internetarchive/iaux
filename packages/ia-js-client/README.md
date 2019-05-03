# WIP ia-js-client

This is a WIP. Still under development, but some some initial progress has been made.


## Code notes

It is written in TypeScript and can be built like this:

```
# If you have tsc installed globally
tsc

# OR using yarn
yarn run build
```

JavaScript's `async` is used heavily, which makes the client very asynchronous.


## General overview

This could be a the Archive.org JavaScript SDK

Features it should have:

- Read/Write APIs
    - Metadata
    - loans

- Search

- Upload
- Download


// TODO

- use rollup to build web version


----


## Structure

/services - each service is a thin wrapper for an Archive.org API

/controllers - represents a more abstract feature, such as an "Item" can have helpers like, get audio tracks


## Ideas

Maybe have a global config?

This would allow things like login credentials, and maybe globally changing the API base for all APIs

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

