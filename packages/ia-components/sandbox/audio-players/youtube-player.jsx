import React, { Component } from 'react';
import PropTypes from 'prop-types';
import youTubeParamsParser from './utils/youtube-params-parser';
import youTubeFullAlbumRegistry from './utils/youtube-full-album-registry';

/**
 * YoutubePlayer
 *
 * Loads the youtube player and plays video of the selected track
 *
 * Also handles full albums with URN standardized time segments
 * This means, that the tracks that come along with the full album have timestamps
 * to signal where they are in the full album
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
      'syncVideoWithPlayer',
      'checkTimeAndTrack'
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
    const { selectedTrack: capturedTrack } = this.state;
    const { id, selectedTrack } = this.props;
    const { id: prevId } = prevProps;
    const trackChanged = id !== prevId;
    const playerNotStarted = capturedTrack === null;
    const setID = !trackChanged && playerNotStarted;
    if (trackChanged || setID) {
      clearTimeout(this.timer);
      this.setState({ id, selectedTrack }, this.playVideo);
    }
  }

  /**
   * Remove timer & interval
   */
  componentWillUnmount() {
    clearInterval(this.fullAlbumVideoPoller);
    this.fullAlbumVideoPoller = null;
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
    const availableID = Number.isInteger(stateID) ? stateID : propsID;
    return availableID;
  }

  /**
   * Check player elapsed time & the track it's on
   *
   * @return { object } trackValue
   * trackValue.elapsedTime = number
   * trackValue.currentTrack = object (return from fullAlbumDetails)
   */
  checkTimeAndTrack() {
    const { fullAlbumDetails, player } = this.state;
    const elapsedTime = player.getCurrentTime();
    const currentTrack = fullAlbumDetails.filter(track => track.startSeconds <= elapsedTime).pop() || {};

    return { elapsedTime, currentTrack };
  }

  /**
   * Callback for YouTube API elapsed poller
   * Checks against what the component says what track are on
   * versus the track the video is currently on based on elapsed time.
   */
  videoTimePoller() {
    const { selectedTrack } = this.state;
    const { youtubePlaylistChange } = this.props;
    const setURLOnly = true;
    const { currentTrack } = this.checkTimeAndTrack();
    const { trackNumber } = currentTrack;
    if (selectedTrack !== trackNumber) {
      youtubePlaylistChange(trackNumber, setURLOnly);
    }
  }

  /**
   * Syncs Full Album Video with Audio Player
   * - pings YouTube's API to check timestamp
   * - finds current track position
   * - sends that to the callback
   */
  syncVideoWithPlayer() {
    const { videoStartedPlaying } = this.state;

    if (videoStartedPlaying) {
      // least disruptive in full video playing experience
      const interval = 800;
      if (!this.fullAlbumVideoPoller) {
        this.fullAlbumVideoPoller = setInterval(() => { this.videoTimePoller(); }, interval);
      }
    }
  }

  /**
   * Load youtube iframe API asyncronously
   * Prevent user interaction with tracklist
   */
  loadAPI() {
    document.querySelector('.audio-track-list').setAttribute('style', 'pointer-events: none');
    const tag = document.createElement('script');
    tag.src = `https://www.youtube.com/iframe_api?origin=${location.origin}`;
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
    const { data } = event;

    if (data === YT.PlayerState.ENDED) {
      const currentTrack = capturedTrack || selectedTrack;
      this.setState({ videoStartedPlaying: false }, () => youtubePlaylistChange(currentTrack));
      clearInterval(this.fullAlbumVideoPoller);
      this.fullAlbumVideoPoller = null;
    }

    if (data === YT.PlayerState.PAUSED) {
      this.setState({ videoStartedPlaying: false });
      clearInterval(this.fullAlbumVideoPoller);
      this.fullAlbumVideoPoller = null;
    }

    if (data === YT.PlayerState.PLAYING) {
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
   * When there is a full album & the subsequent tracks are segmented,
   * we ping YouTube API for status & elapsed time
   * in order to move video accordingly.
   */
  playVideo() {
    const { player, selectedTrack, fullAlbumDetails } = this.state;
    const availableID = this.availableVideoId();
    const params = youTubeParamsParser(availableID);

    if (!fullAlbumDetails) {
      clearInterval(this.fullAlbumVideoPoller);
      player.loadVideoById(params);
      return;
    }

    const trackToPlay = fullAlbumDetails.find((tr = {}) => tr.trackNumber === selectedTrack);
    const { startSeconds } = trackToPlay;

    const playerState = player.getPlayerState();

    if (playerState === YT.PlayerState.CUED) {
      player.seekTo(startSeconds);
      return;
    }

    const { currentTrack } = this.checkTimeAndTrack();
    const sameTrack = trackToPlay.trackNumber === currentTrack.trackNumber;
    if (!sameTrack) {
      player.seekTo(startSeconds);
      if (playerState === YT.PlayerState.PAUSED) {
        player.playVideo();
      }
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
