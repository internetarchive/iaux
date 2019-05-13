import React from 'react'
import PropTypes from 'prop-types'
const debug = require('debug')('ia-components:IAReactComponent');

export default class IAReactComponent extends React.Component {
    // Both dweb-archive.IAFakeReactComponent used with ReactFake and iaux.IAReactComponent used with React should work the same. (e.g. ParentTileImg works with both)
    constructor(props) {
        super(props);
        this.state = {}; // React doesnt do this
        // In both React & ReactFake, _isMounted is set to true on loading
        this._isMounted = false;
        // In both React & ReactFake If you give a HTML tag ref={this.load} then it will call loadcallable with 'this' set to the component and pass the element as the only parameter
        this.load = (el) => this.loadcallable.call(this, el);
        // By default 'onClick=this.onClick' will cause clicking to run the clickCallable routine, and then blocks/forwards event depending on return value, as it would for normal HTML
        this.onClick = (ev) => {
            if (this.clickCallable.call(this, ev)) {
                return true; // Navigate to href if this comes from an anchor
            } else {
                ev.preventDefault();    // Prevent it going to the anchor (equivalent to "return false" in non-React
                // ev.stopPropagation(); ev.nativeEvent.stopImmediatePropagation(); // Suggested alternatives which dont work
                return false; // Stop the non-react version propogating
            }
        };
    }

    /* This was needed in the dweb because we don't know if the component was mounted, and had to set State in two different ways, for example
        in fetch_metadata which is called after mounting in IAUX and before in dweb-archive
        it shouldn't cause problems as if commented out then setState will error (in React) if not mounted, but comment out (on IAUX/React) if needed.
     */
    setState(res) {
        if (this._isMounted) {
            super.setState(res); // Will cause re-rendering
        } else { // Allow setState before mounted
            Object.keys(res).forEach(k => this.state[k] = res[k]);
        }
    }
    loadcallable(el) { // Catch error of ref=this.load without defining loadcallable
        debug("loadcallable needs defining if using ref=this.load");
    }
    componentDidMount() { this._isMounted = true; }
}
