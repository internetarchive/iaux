import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { chain, includes } from 'lodash';
import youTubeParamsParser from './utils/youtube-params-parser';
import youTubeFullAlbumRegistry from './utils/youtube-full-album-registry';

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

    const { playlist } = props;
    const fullAlbumDetails = youTubeFullAlbumRegistry(playlist);
    this.timer = null;
    this.fullAlbumVideoPoller = null;

    this.state = {
      fullAlbumDetails,
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
      'playVideo',
      'availableVideoId',
      'syncVideoWithPlayer'
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
   * Remove timer & interval
   */
  componentWillUnmount() {
    clearInterval(this.fullAlbumVideoPoller);
    clearTimeout(this.timer);
  }

  /**
   * Gets available YouTube ID
   * checks between captured ID (state) & incoming ID (props)
   * when there isn't a captured ID, it means the player has loaded & user has not selected a video
   */
  availableVideoId() {
    const { id: stateID } = this.state;
    const { id: propsID } = this.props;
    const availableID = stateID || propsID;
    return availableID;
  }

  /**
   * Syncs Full Album Video with Audio Player
   * - pings YouTube's API to check timestamp
   * - finds current track position
   * - sends that to the callback
   */
  syncVideoWithPlayer() {
    const { fullAlbumDetails, player, videoStartedPlaying } = this.state;
    const { youtubePlaylistChange } = this.props;
    const setURLOnly = true;

    const videoTimePoller = () => {
      const elapsedTime = player.getCurrentTime();
      const currentTrack = chain(fullAlbumDetails)
        .filter(track => track.startSeconds < elapsedTime)
        .last()
        .value();

      const { trackNumber } = currentTrack;
      youtubePlaylistChange(trackNumber, setURLOnly);
    };

    if (videoStartedPlaying) {
      videoTimePoller();
      this.fullAlbumVideoPoller = setInterval(videoTimePoller, 5000);
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
    const { playerAnchor } = this.state;
    const availableID = this.availableVideoId();
    const videoParams = youTubeParamsParser(availableID);
    const defaultParams = {
      height: '600',
      width: '600',
      playerVars: {
        fs: 1,
        rel: 0,
        enablejsapi: 1,
        origin: location.origin,
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
    const { youtubePlaylistChange, selectedTrack } = this.props;
    const { selectedTrack: capturedTrack, videoStartedPlaying, fullAlbumDetails } = this.state;

    if (event.data === YT.PlayerState.ENDED) {
      const currentTrack = capturedTrack || selectedTrack;
      this.setState({ videoStartedPlaying: false }, () => youtubePlaylistChange(currentTrack));
      clearInterval(this.fullAlbumVideoPoller);
    }

    if (event.data === YT.PlayerState.PLAYING) {
      const setURLOnly = true;
      if (!videoStartedPlaying) {
        this.setState({ videoStartedPlaying: true }, () => youtubePlaylistChange(selectedTrack, setURLOnly));
      }

      if (fullAlbumDetails) {
        this.syncVideoWithPlayer();
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
    const { player } = this.state;
    const availableID = this.availableVideoId();
    const params = youTubeParamsParser(availableID);
    const { videoId, startSeconds, hasTimestamp } = params;
    const sameVideo = includes(availableID, videoId) && hasTimestamp;
    if (sameVideo) {
      player.seekTo(startSeconds);
    } else {
      clearInterval(this.fullAlbumVideoPoller);
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
  playlist: PropTypes.string.isRequired,
};

export default YoutubePlayer;
