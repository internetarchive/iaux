import React from 'react'
import PropTypes from 'prop-types';
import ReactJWPlayer from 'react-jw-player';


export default class JWPlayerContainer extends React.Component {
  static propTypes = {
    playlist: PropTypes.array.isRequired,
  }

  static displayName = 'ReactJWPlayerContainer'

  constructor(props) {
    super(props);
    this.state = {
      videoTitle: '',
    };

    // this.onAdPlay = this.onAdPlay.bind(this);
    this.onReady = this.onReady.bind(this);
    // this.onVideoLoad = this.onVideoLoad.bind(this);

    // each instance of <ReactJWPlayer> needs a unique id.
    // we randomly generate it here and assign to the container instance.
    this.playerId = 'test-player'
  }
  onReady(event) {
    // interact with JW Player API here
    // const player = window.jwplayer(this.playerId);
  }
  // onAdPlay(event) {
  //   // track the ad play here
  // }
  // onVideoLoad(event) {
  //   this.setState({
  //     videoTitle: event.item.description // this only works with json feeds!
  //   });
  // }

  render() {
    let playerScript = 'https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.min.js'
    playerScript = 'https://archive.org/jw/8/jwplayer.js?v=cf7f2eh'
    return (
      <div className='react-jw-player-container'>
        {/* <script src={playerScript} /> */}
        <ReactJWPlayer
          isAutoPlay={false}
          playlist={this.props.playlist}
          licenseKey='your-license-key'
          // onAdPlay={this.onAdPlay}
          // onReady={this.onReady}
          onVideoLoad={this.onVideoLoad}
          playerId={this.playerId} // bring in the randomly generated playerId
          // playerScript='https://archive.org/jw/8/jwplayer.js?v=cf7f2eh'
          playerScript={playerScript}
        />
      </div>
    );
  }
}
