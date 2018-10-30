import React from 'react'

export default () => {
  return <div className="thats-right col-sm-4 col-sm-push-8">
  <div className="action-buttons topinblock">
    <div className="topinblock">
      <a className="button " id="favorite-button" href="/bookmarks.php?add_bookmark=1&mediatype=audio&identifier=cd_point-of-departure_andrew-hill&title=Point+of+Departure" aria-haspopup="true" data-target="#confirm-modal" data-toggle="tooltip" data-container="body" data-placement="bottom" title data-original-title="Favorite this item">
        <span className="iconochive-favorite" aria-hidden="true" /><span className="sr-only">favorite</span>        </a>
    </div><div className="topinblock">
      <button id="share-button" className="button" type="button" aria-haspopup="true"  data-target="#cher-modal" data-toggle="tooltip" data-container="body" data-placement="bottom" title data-original-title="Share this item">
        <span className="iconochive-share" aria-hidden="true" /><span className="sr-only">share</span>        </button>
    </div><div id="flag-button-container" className="topinblock" data-toggle="tooltip" data-placement="bottom" data-container="body" title data-original-title="Flag this item">
      <div className="dropup">
        <button id="flag-button" className=" button" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="iconochive-Flag" aria-hidden="true" /><span className="sr-only">flag</span></button>
        <div id="flag-popover" className="dropdown-menu" aria-labelledby="flag-button">
          <h3 className="dropdown-title">Flag this item for</h3>
          <ul role="menu">
            <li className>
              <a href="/account/login.php" role="menuitem">
                Graphic Violence              </a>
            </li>
            <li className>
              <a href="/account/login.php" role="menuitem">
                Graphic Sexual Content              </a>
            </li>
            <li className>
              <a href="/account/login.php" role="menuitem">
                Spam, Scam or Fraud              </a>
            </li>
            <li className>
              <a href="/account/login.php" role="menuitem">
                Broken or Empty Data              </a>
            </li>
          </ul>
        </div> {/* /#flag-popover */}
      </div> {/*/.dropdown */}
    </div>
  </div>{/*/.action-buttons*/}
</div>
}