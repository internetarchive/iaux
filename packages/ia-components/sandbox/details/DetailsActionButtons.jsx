//const debug = require('debug')('dweb-archive:DetailsActionButtons');
import React from 'react';
import IAReactComponent from '../IAReactComponent'; // Encapsulates differences between dweb-archive/ReactFake and iaux/React
import DetailsFlags from './DetailsFlags.jsx';
import {AnchorModalGo, ButtonModalGo} from './ModalGo.jsx';

/* DetailsActionButtons are a group of buttons, usually shown on the right, that include bookmarking, sharing and flagging.
    Its currently used in dweb-archive/Details.js
    <DetailsActionButtons title="xxx" description="yyy"/>
 */

export default class DetailsActionButtons extends IAReactComponent {

    constructor(props)
    {
        super(props) //identifier, title
    }
    render() {
        const bookmarksAddURL = `https://archive.org/bookmarks.php?add_bookmark=1&amp;mediatype=image&amp;identifier=${this.props.identifier}&amp;title=${this.props.title}`; //TODO find way to submit distributed
        return (
            <div className="action-buttons">
                <div className="topinblock">
                    <AnchorModalGo className="button " opts={{favorite:1}}  href={bookmarksAddURL} id="favorite-button" aria-haspopup="true"
                                   data-target="#confirm-modal" data-toggle="tooltip"
                                   data-container="body" data-placement="bottom" title="Favorite this item">
                        <span className="iconochive-favorite" aria-hidden="true"></span><span className="sr-only">favorite</span>
                    </AnchorModalGo>
                </div>
                <div className="topinblock">
                    <ButtonModalGo id="share-button" className="button" opts={{ignore_lnk:1,shown:AJS.embed_codes_adjust}}
                                   type="button" aria-haspopup="true"
                                   data-target="#cher-modal" data-toggle="tooltip" data-container="body" data-placement="bottom"
                                   title="Share this item">
                        <span className="iconochive-share" aria-hidden="true"></span><span className="sr-only">share</span></ButtonModalGo>
                </div>
                <DetailsFlags/>
            </div>
        )
    }
}
