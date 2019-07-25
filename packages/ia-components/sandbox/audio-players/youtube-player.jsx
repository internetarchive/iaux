import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import youTubeParamsParser from './utils/youtube-params-parser';

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

    this.timer = null;

    this.state = {
      player: null,
      playerAnchor: React.createRef(),
      selectedTrack: null,
      id: null,
      videoStartedPlaying: false,
    };

    [
      'loadPlayer',
      'onPlayerStateChange',
      'onPlayerReady',
      'onPlayerError',
      'playVideo'
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
      };
    } else {
      this.loadPlayer();
    }
  }

  /**
   * Update component only if there is a change in video id
   * If above update video id and selected track
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { id, player } = this.state;
    if (!player && nextState.player) {
      return false;
    }

    const trackChanged = id !== nextProps.id;
    return trackChanged;
  }

  /**
   * Load video of passed id and default resolution
   */
  componentDidUpdate(prevProps) {
    const { id, selectedTrack } = this.props;
    const trackChanged = id !== prevProps.id;

    if (trackChanged) {
      clearTimeout(this.timer);
      this.setState({ id, selectedTrack }, this.playVideo);
    }
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
    const { id: propsID } = this.props;
    const availableID = id || propsID;
    const videoParams = youTubeParamsParser(availableID);
    const defaultParams = {
      height: '600',
      width: '600',
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
    };
    const params = Object.assign({}, defaultParams, videoParams);
    const player = new window.YT.Player(playerAnchor.current, params);

    this.setState({ player });
  }

  /**
   * Fire when video ends
   * Call youtubePlaylistChange to switch to next track number
   */
  onPlayerStateChange(event) {
    const { youtubePlaylistChange } = this.props;
    const { selectedTrack, videoStartedPlaying } = this.state;

    if (event.data === YT.PlayerState.ENDED) {
      this.setState({ videoStartedPlaying: false }, () => youtubePlaylistChange(selectedTrack));
    }
    if (event.data === YT.PlayerState.PLAYING) {
      if (!videoStartedPlaying) {
        const setURLOnly = true;
        this.setState({ videoStartedPlaying: true }, () => {
          youtubePlaylistChange(selectedTrack, setURLOnly);
        });
      }
    }
  }

  /**
   * Fire when player is ready
   * Allow user interaction with tracklist
   * Play loaded video
   */
  onPlayerReady(event) {
    document.querySelector('.audio-track-list').setAttribute('style', 'pointer-events: auto');
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

  /**
   * Play the video
   * Gather all the correct settings and call YouTube player api to play the video
   */
  playVideo() {
    const { id, player } = this.state;
    const { id: propsID } = this.props;
    const availableID = id || propsID;
    const params = youTubeParamsParser(availableID);
    const { videoId, startSeconds } = params;
    const sameVideo = includes(availableID, videoId);
    if (sameVideo) {
      player.seekTo(startSeconds);
    } else {
      player.loadVideoById(params);
    }
  }

  render() {
    const { playerAnchor } = this.state;
    return (
      <div className="YoutubePlayer">
        <div ref={playerAnchor} />
      </div>
    );
  }
}

YoutubePlayer.propTypes = {
  selectedTrack: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  youtubePlaylistChange: PropTypes.func.isRequired,
};

export default YoutubePlayer;
