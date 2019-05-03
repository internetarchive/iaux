//const debug = require('debug')('dweb-archive:DetailsFlags');
import React from 'react';
import IAReactComponent from '../IAReactComponent'; // Encapsulates differences between dweb-archive/ReactFake and iaux/React
//import PropTypes from 'prop-types' // Not currently used by IAUX

/* DetailsFlags is a component intended for the details page to show any content flagging.
    Its currently used in dweb-archive/Details.js
 */

export default class DetailsFlags extends IAReactComponent {

    constructor(props)
    {
        super(props) //none
    }
    render() {
        const loginURL = "https://archive.org/account/login.php"; //TODO - its a Direct link as dont support authentication in DWeb version
        return (
            <div
                id="flag-button-container" className="topinblock" data-toggle="tooltip" data-placement="bottom"
                data-container="body" title="Flag this item">
                <div className="dropup">
                    <button id="flag-button" className=" button" type="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false"><span className="iconochive-Flag" aria-hidden="true"></span><span
                        className="sr-only">flag</span></button>
                    <div id="flag-popover" className="dropdown-menu" aria-labelledby="flag-button">
                        <h3 className="dropdown-title">Flag this item for</h3>
                        <ul role="menu">
                            <li className="">
                                <a href={loginURL} role="menuitem">
                                    Graphic Violence </a>
                            </li>
                            <li className="">
                                <a href={loginURL} role="menuitem">
                                    Graphic Sexual Content </a>
                            </li>
                            <li className="">
                                <a href={loginURL} role="menuitem">
                                    Spam, Scam or Fraud </a>
                            </li>
                            <li className="">
                                <a href={loginURL} role="menuitem">
                                    Broken or Empty Data </a>
                            </li>
                        </ul>
                    </div>
                    {/*-- /#flag-popover --*/}
                </div>
                {/*--/.dropdown --*/}
            </div>
        )
    }
}