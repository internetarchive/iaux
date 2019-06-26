import React, { Component } from 'react'
import PropTypes from 'prop-types'

// No restrictions for using iframe :)
// functions and parameters such as autoplay, playVideo(), loadVideoById() won't work in all mobile environments

class YoutubePlayer extends Component {

  constructor(props) {
    super(props);

    const { selectedTrack, id } = props

    this.state = {
      player: null,
      playerAnchor: React.createRef(),
      selectedTrack,
      id
    }

    // use static methods?
    this.loadAPI = this.loadAPI.bind(this);
    this.loadPlayer = this.loadPlayer.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerError = this.onPlayerError.bind(this);
  }

  // load api and iframe object
  componentDidMount() {
    this.loadAPI();
    this.loadPlayer();
  }

  // Re render component only if track number changes and iframe has loaded
  shouldComponentUpdate(nextProps) {
    const { id } = this.state;
    if (id !== nextProps.id) {
      this.setState({
        id: nextProps.id,
        selectedTrack: nextProps.selectedTrack
      });
      return true;
    }
    return false;
  }

  // if component updates load video with received id
  componentDidUpdate() {
    const { id, player } = this.state;
    player.loadVideoById(id, 'default'); // change resolution?
  }

  // Load iframe API async
  loadAPI() {
    // if (!window.YT)
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // Load iframe object
  loadPlayer() {
    const { id, playerAnchor } = this.state;
    window.onYouTubeIframeAPIReady = () => {
      this.setState({
        player: new window.YT.Player(playerAnchor.current, {
          height: '600',
          width: '600',
          videoId: id,
          playerVars: {
            fs: 1,
            rel: 0,
            enablejsapi: 1
          },
          events: {
            onReady: this.onPlayerReady,
            onStateChange: this.onPlayerStateChange,
            onError: this.onPlayerError
          }
        })
      });
    }; // Height and width? // playerVars?
  }

  // If video ends, move on to next track
  onPlayerStateChange(event) {
    const { youtubePlaylistChange } = this.props;
    const { selectedTrack } = this.state;
    if (event.data === YT.PlayerState.ENDED) youtubePlaylistChange(selectedTrack);
  }

  // Play video when player ready
  onPlayerReady(event) {
    event.target.playVideo();
  }

  // If player encounters an error move on to next track
  onPlayerError(event) {
    const { youtubePlaylistChange } = this.props;
    const { selectedTrack } = this.state;
    // setTimeout() to display error message? (3s)
    youtubePlaylistChange(selectedTrack);
  }

  render() {
    const { playerAnchor } = this.state
    return (
      <div className="YoutubePlayer">
        <div ref={playerAnchor} />
      </div>
    )
  }
}

YoutubePlayer.propTypes = {
  selectedTrack: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  youtubePlaylistChange: PropTypes.func.isRequired
};

export default YoutubePlayer;
