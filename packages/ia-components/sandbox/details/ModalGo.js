//const debug = require('debug')('dweb-archive:DetailsActionButtons');
import React from 'react';
import IAReactComponent from '../IAReactComponent'; // Encapsulates differences between dweb-archive/ReactFake and iaux/React

/* AnchorModalGo and ButtonModalGo wrap the AJS.modal_go call in archive.js to allow it to work with react.
 */

// Utility functions, I (Mitra) like to put these on Object, but maybe better here.
function ObjectFromEntries(arr) { arr.reduce((res,kv)=>(res[kv[0]]=kv[1],res),{});} // [[ k0, v0],[k1,v1] => {k0:v0, k1:v1}
function ObjectFilter(obj, f) { ObjectFromEntries( Object.entries(obj).filter(kv=>f(kv[0], kv[1]))); }

class _ModalGo extends IAReactComponent {
    constructor(props) {
        super(props); // opts, remaining props go to anchor, in particular href
        this.state.linkProps = ObjectFilter(this.props, (k, unused_v) => !["opts", "children"].includes(k)); // pass on any other props
    }

    clickCallable(ev) {
        // ev.currentTarget is the HTML Element on which the onClick sits
        return AJS.modal_go(ev.currentTarget, this.props.opts)
    }
}
class AnchorModalGo extends _ModalGo {
    constructor(props) { super(props) }; // opts, remaining props go to anchor, in particular href

    render() { return(
            <a {...this.state.linkProps} onClick={this.onClick}>{this.props.children}</a>
    ) }
}
class ButtonModalGo extends _ModalGo {
    constructor(props) { super(props) }; // opts, remaining props go to anchor, in particular href

    render() { return(
        <button {...this.state.linkProps} onClick={this.onClick}>{this.props.children}</button>
    )}
}
export {AnchorModalGo, ButtonModalGo}

