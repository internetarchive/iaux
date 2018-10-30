import React from 'react'

export default () => (
  <div>
    <div className="key-val-big">
      Publication date <a href="/search.php?query=date:1999">
        <span itemProp="datePublished">1999</span>
      </a>
    </div>
    <div className="key-val-big">
      Topics
      <span itemProp="keywords"><a href="/search.php?query=subject%3A%22Bebop+%26+Modern+Jazz%22" rel="nofollow">Bebop &amp; Modern Jazz</a></span>
    </div>
    {/* sponsor (also does usage rights, if specified for the sponsor) */}
    {/* contributor (also does usage rights, if specified for the contributor) */}
    <div className="key-val-big">
      <div>    <span className="key">Language</span>
        <span className="value"><span><a href="/search.php?query=%28language%3Aeng+OR+language%3A%22English%22%29" rel="nofollow">English</a></span></span>
      </div>      </div>
    <div className="clearfix" />
    <p className="well well-sm statusMessage">This item is available with audio samples only</p><div id="descript" itemProp="description">Track Listings:<br />
      <br />
      1. Refuge<br />
      2. New Monastery<br />
      3. Spectrum<br />
      4. Flight 19<br />
      5. Dedication<br />
      6. New Monastery (alternate take)<br />
      7. Flight 19 (alternate take)<br />
      8. Dedication (alternate take)
    </div>{/*/#descript*/}
    <br /><div>    <span className="key">See also</span>
      <span className="value"><a href="https://amzn.com/B00000IWVY" target="_blank">Amazon<img title="[Amazon]" alt="[Amazon]" style={{marginRight: '0.05em', marginLeft: '0.25em', verticalAlign: 'middle'}} src="/images/amazon-small.png" /></a>; <a href="https://musicbrainz.org/release/2380d3a7-c8f8-4468-ac1e-bb96cfc5237a" target="_blank">MusicBrainz (release)<img title="[MusicBrainz (release)]" alt="[MusicBrainz (release)]" style={{marginRight: '0.05em', marginLeft: '0.25em', verticalAlign: 'middle'}} src="/images/musicbrainz-small.png" /></a>; <a href="https://musicbrainz.org/release-group/d7931540-f35c-3978-9bd8-6e77ab66334d" target="_blank">MusicBrainz (release group)<img title="[MusicBrainz (release group)]" alt="[MusicBrainz (release group)]" style={{marginRight: '0.05em', marginLeft: '0.25em', verticalAlign: 'middle'}} src="/images/musicbrainz-small.png" /></a>; <a href="https://en.wikipedia.org/wiki/Point_of_Departure_(Andrew_Hill_album)" target="_blank">Wikipedia (English)<img title="[Wikipedia (English)]" alt="[Wikipedia (English)]" style={{marginRight: '0.05em', marginLeft: '0.25em', verticalAlign: 'middle'}} src="/images/wikipedia-small.png" /></a></span>
    </div>
    <div className="metadata-expandable-list" role="list">
      <div role="listitem">
        <span className="key">Album</span>
        <span className="value">Point of Departure</span>
      </div>
      <div role="listitem">
        <span className="key">Artist</span>
        <span className="value">Andrew Hill</span>
      </div>
      <div role="listitem">
        <span className="key">External_metadata_update</span>
        <span className="value">2018-07-01T01:39:38Z</span>
      </div>
      <div role="listitem">
        <span className="key">Identifier</span>
        <span className="value"><span itemProp="identifier">cd_point-of-departure_andrew-hill</span></span>
      </div>
      <div role="listitem">
        <span className="key">Releasetype</span>
        <span className="value">album</span>
      </div>
      <div role="listitem">
        <span className="key">Scanner</span>
        <span className="value">Internet Archive HTML5 Uploader 1.6.1</span>
      </div>
      <div role="listitem">
        <span className="key">Source</span>
        <span className="value"><span itemProp="sameAs">CD</span></span>
      </div>
      <div role="listitem">
        <span className="key">Toc</span>
        <span className="value">1 8 258072 150 55395 87275 131339 150713 181104 209131 226344</span>
      </div>
      <div role="listitem">
        <span className="key">Year</span>
        <span className="value"><a href="/search.php?query=year%3A%221999%22">1999</a></span>
      </div>
    </div>
  </div>
)