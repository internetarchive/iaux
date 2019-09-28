// const debug = require('debug')('dweb-archive:DetailsActionButtons');
import React from 'react';
import IAReactComponent from '../IAReactComponent';
import { AnchorModalGo, ButtonModalGo } from './ModalGo';
import { I18nSpan, I18nIcon, I18nStr } from "../languages/Languages";

/**
 * DetailsActionButtons are a group of buttons, usually shown on the right, that include bookmarking, sharing and flagging.
 * DetailsFlags is used by DetailsActionButtons for the group of flags
 * DetailsFlag is for a single flag button
 *
 * Behavior:
 *  On construction: Nothing
 *
 * Rendering
 *  DetailsActionButtons renders as a set of buttons for bookmarking, sharing and the group for flagging and is used on dweb-archive/Details.js
 *  DetailsFlagLI and DetailsFlags are used by DetailsActionButtons
 *
 * Each button behaves differently
 *  Bookmark button access a URL via the AnchorModalGo component (TODO Doesn't work in Dweb because not logged in)
 *  Share button pops up a box with possible places to share via the ButtonModalGo component to #cher-modal
 *  Flags button pops up a menu of the flags (TODO Doesn't work in Dweb because not logged in)
 */

/**
 * <DetailsFlagLI
 *      href="https:..."        Url to go to on flagging
 *      en=ENSTRING             text of flag
 * />
 */
class DetailsFlagLI extends IAReactComponent {
  constructor(props) {
    super(props); // href, text
  }

  render() {
    return (
      <li className="">
        <a href={this.props.href} role="menuitem">
          <I18nSpan en={this.props.en}/>}
        </a>
      </li>
    );
  }
}

/**
 *  <DetailsFlags/>             Render just the flag icon leading to the popup.
 */
class DetailsFlags extends IAReactComponent {
  constructor(props) {
    super(props); // disconnected
  }

  render() {
    const loginURL = 'https://archive.org/account/login.php'; // TODO - its a Direct link as dont support authentication in DWeb version, may be better URL for IAUX
    return ( this.props.disconnected ? null :
      <div
        id="flag-button-container"
        className="topinblock"
        data-toggle="tooltip"
        data-placement="bottom"
        data-container="body"
        title={I18nStr("Flag this item")}
      >
        <div className="dropup">
          <button
            id="flag-button"
            className=" button"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <I18nIcon className="iconochive-Flag" en="flag"/>
          </button>
          <div id="flag-popover" className="dropdown-menu" aria-labelledby="flag-button">
            <h3 className="dropdown-title"><I18nSpan en="Flag this item for"/></h3>
            <ul role="menu">
              <DetailsFlagLI href={loginURL} en="Graphic Violence"/>
              <DetailsFlagLI href={loginURL} en="Graphic Sexual Content"/>
              <DetailsFlagLI href={loginURL} en="Spam, Scam or Fraud"/>
              <DetailsFlagLI href={loginURL} en="Broken or Empty Data"/>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

/**
 *  <DetailsActionButtons
 *      identifier="xxx"        Identifier of item being bookmarked
 *      title=ENSTRING          String to use for the bookmark (from the item's title)
 *  />
 */
class DetailsActionButtons extends IAReactComponent {
  constructor(props) {
    super(props); // identifier, title, disconnected
  }

  render() {
    const bookmarksAddURL = `https://archive.org/bookmarks.php?add_bookmark=1&amp;mediatype=image&amp;identifier=${this.props.identifier}&amp;title=${this.props.title}`; // TODO find way to submit distributed
    return (
      <div className="action-buttons">
        {this.props.disconnected ? null :
          <div className="topinblock">
            <AnchorModalGo
              className="button "
              opts={{favorite: 1}}
              href={bookmarksAddURL}
              id="favorite-button"
              aria-haspopup="true"
              data-target="#confirm-modal"
              data-toggle="tooltip"
              data-container="body"
              data-placement="bottom"
              en="Favorite this item"
            >
              <I18nIcon className="iconochive-favorite" en="favorite"/>
            </AnchorModalGo>
          </div>
        }
        <div className="topinblock">
          <ButtonModalGo
            id="share-button"
            className="button"
            opts={{ ignore_lnk: 1, shown: AJS.embed_codes_adjust }}
            type="button"
            aria-haspopup="true"
            data-target="#cher-modal"
            data-toggle="tooltip"
            data-container="body"
            data-placement="bottom"
            en="Share this item"
          >
            <I18nSpan className="iconochive-share" en="share"/>
          </ButtonModalGo>
        </div>
        <DetailsFlags disconnected={this.props.disconnected}/>
      </div>
    );
  }
}

export { DetailsFlagLI, DetailsFlags, DetailsActionButtons };
