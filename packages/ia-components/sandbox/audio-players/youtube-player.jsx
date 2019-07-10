import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * YoutubePlayer
 *
 * Loads the youtube player and plays video of the selected track
 *
 * @params see PropTypes
 */

class YoutubePlayer extends Component {

  constructor(props) {
    super(props);

    const { selectedTrack, id } = props;
    this.timer = null;

    this.state = {
      player: null,
      playerAnchor: React.createRef(),
      selectedTrack,
      id
    };

    [
      'loadPlayer',
      'onPlayerStateChange',
      'onPlayerReady',
      'onPlayerError'
    ].forEach((item) => {
      this[item] = this[item].bind(this);
    });
  }

  /**
   * Load the youtube iframe API if not previously loaded
   * Load the youtube player object when youtube iframe api is ready
   */
  componentDidMount() {
    if (!window.YT) {
      this.loadAPI();
      window.onYouTubeIframeAPIReady = () => {
        this.loadPlayer();
      }
    } else {
      this.loadPlayer();
    }
  }

  /**
   * Update component only if there is a change in video id
   * If above update video id and selected track
   */
  shouldComponentUpdate(nextProps) {
    const { id } = this.state;
    const trackChanged = id !== nextProps.id;
    if (trackChanged) {
      clearTimeout(this.timer);
      this.setState({
        id: nextProps.id,
        selectedTrack: nextProps.selectedTrack
      });
    }
    return trackChanged;
  }

  /**
   * Load video of passed id and default resolution
   */
  componentDidUpdate() {
    const { id, player } = this.state;
    player.loadVideoById(id, 'default');
  }

  /**
   * Load youtube iframe API asyncronously
   * Prevent user interaction with tracklist
   */
  loadAPI() {
    document.querySelector('.audio-track-list').setAttribute('style', 'pointer-events: none');
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  /**
   * Load youtube player object
   * Update player
   */
  loadPlayer() {
    const { id, playerAnchor } = this.state;
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
  }

  /**
   * Fire when video ends
   * Call youtubePlaylistChange to switch to next track number
   */
  onPlayerStateChange(event) {
    const { youtubePlaylistChange } = this.props;
    const { selectedTrack } = this.state;
    if (event.data === YT.PlayerState.ENDED) youtubePlaylistChange(selectedTrack);
  }

  /**
   * Fire when player is ready
   * Allow user interaction with tracklist
   * Play loaded video
   */
  onPlayerReady(event) {
    document.querySelector('.audio-track-list').setAttribute('style', 'pointer-events: auto');
    event.target.playVideo();
  }

  /**
   * Fire when an error is encountered
   * Call youtubePlaylistChange to switch to next track number after a 3 sec delay
   */
  onPlayerError(event) {
    const { youtubePlaylistChange } = this.props;
    const { selectedTrack } = this.state;
    this.timer = setTimeout(() => { youtubePlaylistChange(selectedTrack); }, 3000);
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
