WIP iajs

This could be a the Archive.org JavaScript SDK

Features it should have:

- Read/Write APIS
    - Metadata
    - loans

- Search

- Upload
- Download


// TODO

- use rollup to build web version


----


## WIP Structure

/services - each service is a thin wrapper for an Archive.org API

/controllers - represents a more abstract feature, such as an "Item" can have helpers like, get audio tracks


## Ideas

Maybe have a global config?

This would allow things like login credentials, and maybe globally changing the API base for all apis