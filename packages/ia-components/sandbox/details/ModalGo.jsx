// const debug = require('debug')('dweb-archive:ModalGo');
import React from 'react';
import { ObjectFilter } from '../../util';
import { I18nStr } from '../languages/Languages';
/* global AJS */
/**
 *  AnchorModalGo and ButtonModalGo wrap the AJS.modal_go call in archive.js to allow it to work with react.
 */

class _ModalGo extends React.Component {
  constructor(props) {
    // TODO-STATE this might have the issue of constructor not being re-run and needing componentDidMount catch
    super(props); // opts, remaining props go to anchor, in particular href
    this.state = { linkProps: ObjectFilter(this.props, (k, unused_v) => !['opts', 'children', 'en'].includes(k)) }; // pass on any other props
    this.onClick = this.onClick.bind(this);
  }

  onClick(ev) {
    // ev.currentTarget is the HTML Element on which the onClick sits
    // noinspection JSUnresolvedFunction
    AJS.modal_go(ev.currentTarget, this.props.opts); // Unclear if return from this is what we want (false to run ev.preventDefault)
    ev.preventDefault(); // Dont propogate event
  }
}

/**
 *  <AnchorModalGo
 *    opts={}                               Opts to the AJS.modal_go call
 *    en=ENSTRING                           Passed to title
 *    href, target (and any other props)     Passed to Anchor
 *  >.....</AnchorModalGo>
 *
 *  Behavior: Render an Anchor that when clicked opens a modal dialog via the archive.js code.
 */
class AnchorModalGo extends _ModalGo {
  render() {
    return (
      /* disabling es-lint because this is copied straight from archive.org where it should be fixed first */
      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
      <a {...this.state.linkProps} onClick={this.onClick} title={this.props.en && I18nStr(this.props.en)}>{this.props.children}</a>
    );
  }
}

/**
 *  <ButtonModalGo
 *    opts={}                               Opts to the AJS.modal_go call
 *    en=ENSTRING                           If present, translated and passed to .title
 *    any other properties                  Passed to Button
 *    >.....</ButtonModalGo>
 *
 *  Behavior: Render a Button that when clicked opens a modal dialog via the archive.js code.
 */
class ButtonModalGo extends _ModalGo {
  render() {
    return (
      /* disabling es-lint because this is copied straight from archive.org where it should be fixed first */
      /* eslint-disable react/button-has-type */
      <button {...this.state.linkProps} onClick={this.onClick} title={this.props.en && I18nStr(this.props.en)}>{this.props.children}</button>
    );
  }
}
export { AnchorModalGo, ButtonModalGo };
// Code Review 2019-Oct-16 Mitra
