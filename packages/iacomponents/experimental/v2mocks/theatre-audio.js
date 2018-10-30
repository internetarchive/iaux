import React from 'react'

export default () => (
  <div className="row">
    <div className="xs-col-12 ">
      <div id="theatre-controls" style={{top: 30, visibility: 'visible', backgroundColor: 'black'}}>
        <a href="#" onClick="return AJS.mute_click()"><div data-toggle="tooltip" data-container="body" data-placement="left" className="iconochive-unmute" title data-original-title="sound is on.  click to mute sound." /></a>
        <a href="#" onClick="return AJS.mute_click()"><div data-toggle="tooltip" data-container="body" data-placement="left" className="iconochive-mute" style={{display: 'none'}} title data-original-title="sound is off.  click for sound." /></a>
        <a href="#" onClick="return Play('jw6').speed()"><div data-toggle="tooltip" data-container="body" data-placement="left" className="iconochive-time" title data-original-title="change playback speed" /></a>
      </div>{/*/#theatre-controls*/}
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 audio-image-carousel-wrapper">
          <center>
            <img src="https://ia800506.us.archive.org/26/items/cd_point-of-departure_andrew-hill/Andrew%20Hill%20%281999%29%20-%20Point%20of%20Departure%20%5BFLAC%5D/IMG_00001.jpg?cnt=0" className="img-responsive" />
          </center>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-7 col-lg-8">
          <div className="row">
              <div className="col-sm-6">
                <a href="#" onClick="return Play('jw6').playN(0)">
                  <div className="jwrowV2 playing">
                    <b>1</b>
                    <span className="ttl">
                      Refuge
                    </span>
                    -
                    <span className="tm">
                      00:30
                    </span>
                  </div>
                </a>
                <a href="#" onClick="return Play('jw6').playN(1)">
                  <div className="jwrowV2">
                    <b>2</b>
                    <span className="ttl">
                      New Monastery
                    </span>
                    -
                    <span className="tm">
                      00:30
                    </span>
                  </div>
                </a>
                <a href="#" onClick="return Play('jw6').playN(2)">
                  <div className="jwrowV2">
                    <b>3</b>
                    <span className="ttl">
                      Spectrum
                    </span>
                    -
                    <span className="tm">
                      00:30
                    </span>
                  </div>
                </a>
                <a href="#" onClick="return Play('jw6').playN(3)">
                  <div className="jwrowV2">
                    <b>4</b>
                    <span className="ttl">
                      Flight 19
                    </span>
                    -
                    <span className="tm">
                      00:30
                    </span>
                  </div>
                </a>
              </div>
              <div className="col-sm-6">
                <a href="#" onClick="return Play('jw6').playN(4)">
                  <div className="jwrowV2">
                    <b>5</b>
                    <span className="ttl">
                      Dedication
                    </span>
                    -
                    <span className="tm">
                      00:30
                    </span>
                  </div>
                </a>
                <a href="#" onClick="return Play('jw6').playN(5)">
                  <div className="jwrowV2">
                    <b>6</b>
                    <span className="ttl">
                      New Monastery (alternate take)
                    </span>
                    -
                    <span className="tm">
                      00:30
                    </span>
                  </div>
                </a>
                <a href="#" onClick="return Play('jw6').playN(6)">
                  <div className="jwrowV2">
                    <b>7</b>
                    <span className="ttl">
                      Flight 19 (alternate take)
                    </span>
                    -
                    <span className="tm">
                      00:30
                    </span>
                  </div>
                </a>
                <a href="#" onClick="return Play('jw6').playN(7)">
                  <div className="jwrowV2">
                    <b>8</b>
                    <span className="ttl">
                      Dedication (alternate take)
                    </span>
                    -
                    <span className="tm">
                      00:30
                    </span>
                  </div>
                </a>
              </div>
            </div></div>
        </div>
      </div>{/*/.row*/}
      <div id="cher-modal" className="modal fade" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{padding: 10}}>
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                <span className="iconochive-remove-circle" aria-hidden="true" /><span className="sr-only">remove-circle</span>          </button>
              <h3 className="modal-title">Share or Embed This Item</h3>
            </div>{/*/.modal-header*/}
            <div id="cher-body">
              <div style={{textAlign: 'center', margin: '50px auto'}}>
                <div className="topinblock">
                  <div id="sharer">
                    <a href="https://twitter.com/intent/tweet?url=https://archive.org/details/cd_point-of-departure_andrew-hill&via=internetarchive&text=Point+of+Departure+%3A+Andrew+Hill+%3A+Free+Borrow+%26+Streaming+%3A+Internet+Archive" target="_blank">
                      <div className="sharee iconochive-twitter" data-toggle="tooltip" data-placement="bottom" title data-original-title="Share to Twitter" />
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://archive.org/details/cd_point-of-departure_andrew-hill" target="_blank">
                      <div className="sharee iconochive-facebook" data-toggle="tooltip" data-placement="bottom" title data-original-title="Share to Facebook" />
                    </a>
                    <a href="https://plus.google.com/share?url=https://archive.org/details/cd_point-of-departure_andrew-hill" target="_blank">
                      <div className="sharee iconochive-googleplus" data-toggle="tooltip" data-placement="bottom" title data-original-title="Share to Google+" />
                    </a>
                    <a href="http://www.reddit.com/submit?url=https://archive.org/details/cd_point-of-departure_andrew-hill&title=Point+of+Departure+%3A+Andrew+Hill+%3A+Free+Borrow+%26+Streaming+%3A+Internet+Archive" target="_blank">
                      <div className="sharee iconochive-reddit" data-toggle="tooltip" data-placement="bottom" title data-original-title="Share to Reddit" />
                    </a>
                    <a href="https://www.tumblr.com/share/video?embed=%3Ciframe+width%3D%22640%22+height%3D%22480%22+frameborder%3D%220%22+allowfullscreen+src%3D%22https%3A%2F%2Farchive.org%2Fembed%2F%22+webkitallowfullscreen%3D%22true%22+mozallowfullscreen%3D%22true%22%26gt%3B%26lt%3B%2Fiframe%3E&name=Point+of+Departure+%3A+Andrew+Hill+%3A+Free+Borrow+%26+Streaming+%3A+Internet+Archive" target="_blank">
                      <div className="sharee iconochive-tumblr" data-toggle="tooltip" data-placement="bottom" title data-original-title="Share to Tumblr" />
                    </a>
                    <a href="http://www.pinterest.com/pin/create/button/?url=https://archive.org/details/cd_point-of-departure_andrew-hill&description=Point+of+Departure+%3A+Andrew+Hill+%3A+Free+Borrow+%26+Streaming+%3A+Internet+Archive" target="_blank">
                      <div className="sharee iconochive-pinterest" data-toggle="tooltip" data-placement="bottom" title data-original-title="Share to Pinterest" />
                    </a>
                    <a href="https://archive.org/pop/editor.html?initialMedia=https://archive.org/details/cd_point-of-departure_andrew-hill" target="_blank">
                      <div className="sharee iconochive-popcorn" data-toggle="tooltip" data-placement="bottom" title data-original-title="Share to Popcorn Maker" />
                    </a>
                    <a href="mailto:?body=https://archive.org/details/cd_point-of-departure_andrew-hill&subject=Point of Departure : Andrew Hill : Free Borrow & Streaming : Internet Archive">
                      <div className="sharee iconochive-email" data-toggle="tooltip" data-placement="bottom" title data-original-title="Share via email" />
                    </a>
                  </div>
                  <br clear="all" className="clearfix" />
                </div>
              </div>
              <div>
                <form className="form" role="form">
                  <div classsName="form-group">
                    <label>EMBED</label>
                    <textarea id="embedcodehere" className="form-control textarea-invert-readonly" rows={3} readOnly="readonly" defaultValue={"<iframe src=\"https://archive.org/embed/cd_point-of-departure_andrew-hill\" width=\"500\" height=\"140\" frameborder=\"0\" webkitallowfullscreen=\"true\" mozallowfullscreen=\"true\" allowfullscreen></iframe>"} />
                  </div>
                </form>
              </div>
              <div>
                <form className="form" role="form">
                  <div className="form-group">
                    <label>EMBED (for wordpress.com hosted blogs and archive.org item &lt;description&gt; tags)</label>
                    <textarea id="embedcodehereWP" className="form-control textarea-invert-readonly" rows={3} readOnly="readonly" defaultValue={"[archiveorg cd_point-of-departure_andrew-hill width=640 height=140 frameborder=0 webkitallowfullscreen=true mozallowfullscreen=true]"} />
                  </div>
                </form>
              </div>
              <div>
                Want more?
                <a href="/help/audio.php?identifier=cd_point-of-departure_andrew-hill">Advanced embedding details, examples, and help</a>!
              </div>
            </div>{/*/#cher-body*/}
          </div>{/*/.modal-content*/}
        </div>{/*/.modal-dialog*/}
      </div>{/*/#cher-modal*/}
    </div>
)