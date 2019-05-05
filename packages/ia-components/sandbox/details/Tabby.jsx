import React from 'react';
import IAReactComponent from '../IAReactComponent';
const debug = require('debug')('ia-components:Tabby');

/* Maybe Used in IAUX in future, but not in ReactFake
static propTypes = {
    identifier: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string, // Optional - to override default value
};
 */


export default class Tabby extends IAReactComponent {
    /*
    This is for a single "tabby", usually there will be a set of them in a Tabbys

    Note that it uses the tabby function in archive.js, a good TODO might be to refactor that code into this component.
     */
    constructor(props)
    {
        super(props);
        this.onClick = (ev) => { return this.clickCallable.call(this, ev); };
        // Can override href e.g. for "web-archive"
        // Note original tabby uses IA's weird, invalid urls like /details/IDENTIFIER&tab=xx which break URL(location)
        // this code does not propogate that bad practice !

        const urlParms = new URL(location).searchParams;
        urlParms.set("tab", this.props.id);
        this.state.href = `${(typeof DwebArchive !== "undefined") ? "/arc/archive.org" : ""}${this.props.href || ("/details/"+this.props.identifier)}?${urlParms.toString()}`
    }
    clickCallable(ev) {
        //TODO in Dweb seeing issues in Firefox where clicking About and then back doesnt always work correctly but it probably doesnt work correctly in existing (non component) dweb code either
        debug("Cicking on link to tab: %s %s",this.props.identifier, this.props.id);
        // this is this React/Fake React object
        // ev.currentTarget is the HTML Element on which the onClick sits
        // ev.target is the HTML element clicked on
        // .replace is because id="web-archive" but call to AJS.tabby is "tabby-web archive"
        const shouldFollow = AJS.tabby(ev.currentTarget,`tabby-${this.props.id.replace('-',' ')}`); // Returns true to follow link, false to skip
        if (!shouldFollow) { ev.preventDefault();  }   // Stop React event propogating (not a problem in FakeReact)
        return false; // Stop the FakeReact event propogating (not a problem in real React)
    }

    render() { return (
        <div className={"tabby"+ (this.default ? " in" : "")}>
            <div>
                <a id={`tabby-${this.props.id}-finder`}
                   className={"stealth" + (this.default ? "tabby-default-finder" : "")}
                   identifier={this.itemid}
                   href={this.state.href}
                   onClick={this.onClick}>
                    {   this.props.abbreviatedText ?
                        <>
                            <span className="tabby-text hidden-xs-span">{this.props.text}</span>
                            <span className="tabby-text visible-xs-span">{this.props.abbreviatedText}</span>
                        </>
                        :
                        <span className="tabby-text">{this.props.text}</span>
                    }
                </a>
            </div>
        </div>
    );
    }
}
