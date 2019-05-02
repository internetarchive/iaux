/* A place for utility functions used in other parts of ia-components. */

/* This is a group of functions that work on Objects (there are more in dweb-archivecontroller/Util.js) */

/* Construct an object based on an array such as produced by Object.entries i.e. [ [k0,v0]* ] */
function ObjectFromEntries(arr) { arr.reduce((res,kv)=>(res[kv[0]]=kv[1],res),{});} // [[ k0, v0],[k1,v1] => {k0:v0, k1:v1}
/*
    Like Array.prototype.filter, applies a filter function to key-value pairs
    The test function should take key and value as argument and return boolean if the test passes.
 */
function ObjectFilter(obj, f) { ObjectFromEntries( Object.entries(obj).filter(kv=>f(kv[0], kv[1]))); }


export {ObjectFromEntries, ObjectFilter}
