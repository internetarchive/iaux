import React from 'react';
import IAReactComponent from './IAReactComponent';
const debug = require('debug')('dweb-archive:AnchorDetails');

export default class AnchorDetails extends IAReactComponent {
    // Component that encapsulates the difference between four options: Dweb||IAUX, React||FakeReact for links.
    // NOTE the one impossible combination is using React:AnchorDetails inside FakeReact element as will be passed wrong kind of children

    /*
    React+!Dweb: no onClick unless want analytics
    FakeReact+!Dweb: No onClick unless want analytics
    React+Dweb:  onClick={this.click}
    FakeReact+Dweb: strangely seems to work with onClick={this.click}
    */

    /* Maybe Used in IAUX in future, but not in ReactFake
    Note other propTypes are passed to underlying Anchor - ones known in use are:
    static propTypes = {
        identifier: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
    };
    */
    constructor(props)
    {
        //TODO-IAUX what about other props and children
        // children: [ react.element* ]
        super(props);
        this.onClick = (ev) => { return this.clickCallable.call(this, ev); };
    }
    clickCallable(ev) {
        debug("Cicking on link to details: %s",this.props.identifier);
        Nav.nav_details(this.props.identifier);
        ev.preventDefault();    // Prevent it going to the anchor (equivlent to "return false" in non-React
        // ev.stopPropagation(); ev.nativeEvent.stopImmediatePropagation(); // Suggested alternatives which dont work
        return false; // Stop the non-react version propogating
    }
    render() {
        // this.props passes identifier which is required for Dweb, but typically also passes tabIndex, class, title
        return ((typeof DwebArchive === "undefined") ?
                <a href={`https://archive.org/details/${this.props.identifier}`} {...this.props}>
                    {this.props.children}
                </a>
            :
                // This is the Dweb version for React|!React
                <a href={`https://archive.org/details/${this.props.identifier}`} onClick={this.onClick}  {...this.props}>
                    {this.props.children}
                </a>
            );
    }
}
