/* global DwebArchive */
import React from 'react';
import IAReactComponent from '../IAReactComponent';
import { I18nSpan } from '../languages/Languages';

/**
 * This is for a single "tabby", usually there will be a set of them in a Tabbys
 *
 * Behavior:
 * On render its just a button that gives impression its a tab with content under it.
 *
 * On click
 *     Note that it uses the tabby function in archive.js, a good TODO might be to refactor that code into this component.

 * Technical:
 *
 * <Tabby
 *    identifier   Archive identifier
 *    id          id of this tab - used by code that switches tabs etc
 *    text EN-STRING Text to be internationalized and to go in the tab
 *    abbreviatedtext Optional shorter text to be internationalized for constrained windows
 *    href        For the URL that pops up, but note that click goes to AJS.tabby
 *    default     Boolean - if present then tab is selected at initial render
 */

const debug = require('debug')('ia-components:Tabby');

export default class Tabby extends IAReactComponent {
  /*
     */
  constructor(props) {
    super(props);
    //TODO-STATE this might have the issue of constructor not being re-run and needing componentDidMount catch
    this.onClick = ev => this.clickCallable.call(this, ev);
    // Can override href e.g. for "web-archive"
    // Note original tabby uses IA's weird, invalid urls like /details/IDENTIFIER&tab=xx which break URL(location)
    // this code does not propogate that bad practice !

    const urlParms = new URL(location).searchParams;
    urlParms.set('tab', this.props.id);
    this.state.href = `${this.props.href || (`/details/${this.props.identifier}`)}?${urlParms.toString()}`;
  }

  clickCallable(ev) {
    debug('Clicking on link to tab: %s %s', this.props.identifier, this.props.id);
    // "this" is the React object
    // ev.currentTarget is the HTML Element on which the onClick sits
    // ev.target is the HTML element clicked on
    // .replace is because id="web-archive" but call to AJS.tabby is "tabby-web archive"
    // noinspection JSUnresolvedFunction
    const shouldFollow = AJS.tabby(ev.currentTarget, `tabby-${this.props.id.replace('-', ' ')}`); // Returns true to follow link, false to skip
    if (!shouldFollow) { ev.preventDefault(); } // Stop React event propogating
    return false; // Stop propogation in non-react examples
  }

  render() {
    return (
      <div className={`tabby${this.props.default ? ' in' : ''}`}>
        <div>
          <a
            id={`tabby-${this.props.id}-finder`}
            className={`stealth${this.props.default ? ' tabby-default-finder' : ''}`}
            identifier={this.itemid}
            href={this.state.href}
            onClick={this.onClick}
          >
            { this.props.abbreviatedText
              ? (
                <>
                  <I18nSpan className="tabby-text hidden-xs-span" en={this.props.text}/>
                  <I18nSpan className="tabby-text visible-xs-span" en={this.props.abbreviatedText}/>
                </>
              )
              : <I18nSpan className="tabby-text" en={this.props.text}/>
            }
          </a>
        </div>
      </div>
    );
  }
}
