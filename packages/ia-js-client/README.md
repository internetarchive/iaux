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