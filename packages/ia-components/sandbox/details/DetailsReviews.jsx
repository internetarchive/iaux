import React from 'react';
import IAReactComponent from '../IAReactComponent';
import AnchorDetails from '../AnchorDetails';
import { I18nSpan, I18nIcon, I18nStr } from "../languages/Languages";

/**
 *  List of reviews on details page
 *
 *  Renders as a nested Div
 *
 *  Behavior none for the component itself, but link from author
 *
 * Technical Notes:
 *  The reviews should be supplied, there needs to be a wrapper in dweb-archive to do this - currently its in Details.js,
 *  as there was a preference (Isa) not to include that functionality here.
 *
 * <DetailsReviews
 *    writeReviewsURL=string  URL to send reviews to
 *    reviews =  [ { reviewer, stars, reviewdate, reviewtitle, reviewbody}* ] as in ARCHIVEITEM.reviews or metadataAPI.reviews.
 * />
 *
 * Typically the caller will fetch reviews independently and setState if not fetched during fetch_metadata
 */


class DetailsReviews extends IAReactComponent {
  //Checked against archive.org output 2019-09-04
  render() {
    const reviews = this.props.reviews;
    const writeReviewsURL = this.props.writeReviewsURL;
    return (
      <div id="reviews">
        <h2
          style={{fontSize: 36, fontWeight: 200, borderBottom: "1px solid #979797", paddingBottom: 5, marginTop: 50 }}>
          { this.props.disconnected ? null :
            <>
              <div className="pull-right" style={{fontSize:14, fontWeight:500, paddingTop:14}}>
                <a className="stealth" href={writeReviewsURL}><I18nIcon className="iconochive-plus-circle" en="plus-circle"/>
                  <I18nSpan en="Add Review"/></a><br/>
              </div>
              <div className="left-icon" style={{marginTop: 3}}><I18nIcon className="iconochive-comment" en="comment"/></div>
            </>
          }
          Reviews
        </h2>
        {reviews && reviews.length ? reviews.map((review, i) => (
          <div key={i} className="aReview" id={`review-${review.review_id}`}>
            <b><I18nSpan en="Reviewer"/>:</b>{' '}
            <AnchorDetails identifier={`@${review.reviewer}`}
                           data-event-click-tracking="ItemReviews|ReviewerLink">{review.reviewer}</AnchorDetails>
            -
            <span alt={`${review.stars} out of 5 stars`} title={`${review.stars} ${I18nStr('out of 5 stars')}`}>
                                        {['*', '*', '*', '*', '*'].slice(0, review.stars).map((x,i) =>
                                          <I18nIcon key={i} className="iconochive-favorite size-75-percent" en="favorite"/>
                                        )}
                                    </span>
            - {review.reviewdate}{/*TODO reviewdate needs pretty printing*/}<br/>
            <b><I18nSpan en="Subject"/>:</b>{' '}{review.reviewtitle}
            <div className="breaker-breaker">{review.reviewbody}</div>
          </div>
        )) : (
          <div className="small-label">
            <I18nSpan en="There are no reviews yet."> </I18nSpan>
            {this.props.disconnected ? null :
              <><I18nSpan en="Be the first one to" /> <a href={writeReviewsURL}><I18nSpan en="write a review" /></a>.</>
            }
          </div>
        )}
      </div>
    );
  }
}
export { DetailsReviews };
