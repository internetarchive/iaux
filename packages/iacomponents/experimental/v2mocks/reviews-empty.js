import React from 'react'

export default () => (
  <div id="reviews">
    <h2 style={{fontSize: 36, fontWeight: 200, borderBottom: '1px solid #979797', paddingBottom: 5, marginTop: 50}}>
      <div className="pull-right" style={{fontSize: 14, fontWeight: 500, paddingTop: 14}}>
        <a className="stealth" href="/write-review.php?identifier=cd_point-of-departure_andrew-hill"><span className="iconochive-plus-circle" aria-hidden="true" /><span className="sr-only">plus-circle</span>            Add Review</a><br />
      </div>
      <div className="left-icon" style={{marginTop: 3}}><span className="iconochive-comment" aria-hidden="true" /><span className="sr-only">comment</span></div>
      Reviews
    </h2>
    <div className="small-label">
      There are no reviews yet. Be the first one to
      <a href="/write-review.php?identifier=cd_point-of-departure_andrew-hill">write a review</a>.
    </div>
  </div>
)