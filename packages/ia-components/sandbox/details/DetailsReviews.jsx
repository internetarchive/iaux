import React from 'react';
import IAReactComponent from '../IAReactComponent';
import AnchorDetails from '../AnchorDetails';

/**
 *  List of reviews on details page
 *
 *  Renders as a TODO
 *
 *  Behavior none for the component itself, but each TODO
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
  //Props: writeReviewsURL string; reviews: [{...}*]

  render() {
    const reviews = this.props.reviews;
    const writeReviewsURL = this.props.writeReviewsURL;
    return (
      <div id="reviews">
        <h2
          style={{fontSize: 36, fontWeight: 200, borderBottom: "1 solid #979797", paddingBottom: 5, marginTop: 50 }}>
          <div className="pull-right" style={{fontSize:14, fontWeight:500, paddingTop:14}}>
            <a className="stealth" href={writeReviewsURL}><span className="iconochive-plus-circle"
                                                                aria-hidden="true"></span><span
              className="sr-only">plus-circle</span>
              Add Review</a><br/>
          </div>
          <div className="left-icon" style={{marginTop: 3}}><span className="iconochive-comment"
                                                                  aria-hidden="true"></span><span
            className="sr-only">comment</span>
          </div>
          Reviews
        </h2>
        {reviews && reviews.length ? reviews.map((review) => (
          <div className="aReview">
            <b>Reviewer:</b>{' '}
            <AnchorDetails identifier={`@${review.reviewer}`}
                           data-event-click-tracking="ItemReviews|ReviewerLink">{review.reviewer}</AnchorDetails>
            -
            <span alt={`${review.stars} out of 5 stars`} title={`${review.stars} out of 5 stars`}>
                                        {['*', '*', '*', '*', '*'].slice(0, review.stars).map(x =>
                                          <span className="iconochive-favorite size-75-percent"
                                                aria-hidden="true"></span>, <span className="sr-only">favorite</span>
                                        )}
                                    </span>
            - {review.reviewdate}{/*TODO reviewdate needs pretty printing*/}<br/>
            <b>Subject:</b>{' '}{review.reviewtitle}
            <div className="breaker-breaker">{review.reviewbody}</div>
          </div>
        )) : (
          <div className="small-label">
            There are no reviews yet. Be the first one to <a href={writeReviewsURL}>write a review</a>.
          </div>
        )}
      </div>
    );
  }
}
export { DetailsReviews };
