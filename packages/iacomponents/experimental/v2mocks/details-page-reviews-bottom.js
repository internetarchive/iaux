import React from 'react'
import PropTypes from 'prop-types'

import MockDetailsSchemaOrg from './schema-org'
import MockRightCol from './right-col'
import MockCollectionsList from './collections-list'

export default class extends React.Component {
  static propTypes = {
    itemTitle: PropTypes.string,
    itemCreator: PropTypes.string,
    // navChild: PropTypes.Component
  }

  static defaultProps = {
    itemTitle: 'Loading...',
    itemCreator: 'Loading...'
  }

  render () {
    return <div id="wrap" itemScope itemType="http://schema.org/AudioObject">
      {this.props.navChild}
      {/* Begin page content */}
      <main id="maincontent">
        <div className="container container-ia">
          {/*HTML*/}
        </div>{/*//.container-ia*/}
        <div id="theatre-ia-wrap" className="container container-ia width-max ">
          <MockDetailsSchemaOrg />
          <h1 className="sr-only">
            Point of Departure</h1>
          <h2 className="sr-only">
            Audio Preview
          </h2>
          <div id="theatre-ia" className="container">
            {this.props.theatreChild}
          </div>{/*//#theatre-ia*/}
          <div id="flag-overlay" className="center-area ">
          </div>
        </div>{/*//.container-ia*/}
        <div className="container container-ia item-details-about">
        </div>{/*/.container-ia*/}
        <div className="container container-ia width-max relative-row-wrap info-top">
          <div className="container container-ia">
            <div className="relative-row row">
              <MockRightCol/>
              <div className="thats-left item-details-metadata col-sm-8 col-sm-pull-4">
                <h1 style={{fontSize: 30, marginBottom: 0}}>
                  <div className="left-icon"><span className="iconochive-audio audio" aria-hidden="true" /><span className="sr-only">audio</span></div>
                  <span itemProp="name">{this.props.itemTitle}</span>
                </h1>
                <div className="key-val-big">
                  <div>    <span className="key">by </span>
                    <span className="value"><span><a href="/search.php?query=creator%3A%22Andrew+Hill%22" rel="nofollow">{this.props.itemCreator}</a></span></span>
                  </div>                </div>
                <br />
              </div>{/*/.thats-left*/}
            </div>
          </div>
        </div>
        <div className="container container-ia width-max relative-row-wrap">
          <div className="container container-ia">
            <div className="relative-row row">
              <div className="col-sm-8 thats-left item-details-metadata">
                <div className="actions-ia">
                </div>
                {this.props.descriptionChild}
              </div>{/*/.thats-left*/}
              <div className="col-sm-4 thats-right item-details-archive-info">
                <section className="boxy item-stats-summary">
                  <p itemProp="interactionStatistic" itemScope itemType="http://schema.org/InteractionCounter">
                    <link itemProp="interactionType" href="http://schema.org/ViewAction" />
                    <span className="item-stats-summary__count" itemProp="userInteractionCount">844</span>
                    Views    </p>
                  <p>
                    <span className="item-stats-summary__count">4</span>
                    Favorites      </p>
                </section>
                <div className="download-button streamo">
                  <nobr><span className="iconochive-info" aria-hidden="true" /><span className="sr-only">info</span> Stream Only</nobr>
                </div>
                <MockCollectionsList/>
                <section className="boxy item-upload-info">
                  <p>
                    Uploaded by
                    <a href="/details/@matthew_c_woods_jr" className="item-upload-info__uploader-name">
                      Matthew_C_Woods_Jr        </a>
                    on <time itemProp="uploadDate">March 6, 2015</time>
                  </p>
                </section>
              </div>{/*/.col-md-2*/}
            </div>{/*/.thats-right*/}
          </div>{/*/.row*/}
        </div>{/*//.container-ia*/}
        <div id="also-found2" className="container container-ia width-max" data-identifier="cd_point-of-departure_andrew-hill" data-host-name="www17.us.archive.org">
          <div className="row">
            <div className="col-xs-12 tilebars">
              <h5 className="small-label">SIMILAR ITEMS (based on metadata)<span id="playplayset"><a data-reactroot className="stealth" href="#play-items" data-event-click-tracking="Playset|PlayAllLink"><span className="iconochive-play" aria-hidden="true" /><span className="sr-only">play</span><span className="hidden-xs-span"> Play All</span><br /></a></span></h5>
              <div id="also-found-result">
                {this.props.relatedChild}
              </div>
            </div>
          </div>
        </div>{/*//.container-ia*/}
        <div className="container container-ia">
        {this.props.reviewsChild}

        </div>{/*/.container*/}
      </main>
    </div>
  } // end render

} // end class