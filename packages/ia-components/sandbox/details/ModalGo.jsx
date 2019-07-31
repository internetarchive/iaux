// const debug = require('debug')('dweb-archive:ModalGo');
import React from 'react';
import IAReactComponent from '../IAReactComponent';
import { ObjectFilter } from '../../util.js';

/**
 *  AnchorModalGo and ButtonModalGo wrap the AJS.modal_go call in archive.js to allow it to work with react.
 *
 *  <AnchorModalGo
 *    opts={}                               Opts to the AJS.modal_go call
 *    href, target (and any other props)     Passed to Anchor
 *  >.....</AnchorModalGo>
 *
 *  <ButtonModalGo
 *    opts={}                               Opts to the AJS.modal_go call
 *    any other properties                  Passed to Button
 *    >.....</AnchorModalGo>
 *
 */

class _ModalGo extends IAReactComponent {
  constructor(props) {
    super(props); // opts, remaining props go to anchor, in particular href
    this.state.linkProps = ObjectFilter(this.props, (k, unused_v) => !['opts', 'children'].includes(k)); // pass on any other props
  }

  clickCallable(ev) {
    // ev.currentTarget is the HTML Element on which the onClick sits
    return AJS.modal_go(ev.currentTarget, this.props.opts);
  }
}
class AnchorModalGo extends _ModalGo {
  constructor(props) { super(props); } // opts, remaining props go to anchor, in particular href

  render() {
    return (
      <a {...this.state.linkProps} onClick={this.onClick}>{this.props.children}</a>
    );
  }
}
class ButtonModalGo extends _ModalGo {
  constructor(props) { super(props); } // opts, remaining props go to anchor, in particular href

  render() {
    return (
      <button {...this.state.linkProps} onClick={this.onClick}>{this.props.children}</button>
    );
  }
}
export { AnchorModalGo, ButtonModalGo };
