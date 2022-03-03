/* global Play */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * IA Audio Player
 * Uses global: Play class (IA JWPlayer wrapper), jwplayer
 *
 * It will display photo if given, and will overlay the media player at the base of the photo.
 *
 * Usage notes:
 * - We directly interact with Play8's Play class, we only listen to JWP.
 * - uses 0 index so it will always be off by -1 when relating to `trackNumber`
 */
class ArchiveAudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.jwPlayerInstance = React.createRef();

    // expecting jwplayer to be globally ready
    this.state = {
      player: null,
      jwplayerInstance: null,
      /** Track Numbers start at 1, 0 = album (unsupported in IA player) */
      trackNumber: null,
      playlistLoadCount: 0,
      playerReady: false,
      startingOnTrack: 0,
      playerEverStarted: false,
      trackStarting: false,
    };

    this.onPlaylistItemCB = this.onPlaylistItemCB.bind(this);
    this.updateAndPlayTrack = this.updateAndPlayTrack.bind(this);
    this.setURL = this.setURL.bind(this);

    this.maxPlaylistLoadsUntilPlayerIsReady = 2;
  }

  /**
   * Register jwplayer/play8 instance as component mounts on client
   */
  componentDidMount() {
    const {
      jwplayerInfo, jwplayerID, backgroundPhoto, onRegistrationComplete, jwplayerStartingPoint
    } = this.props;
    const { jwplayerPlaylist, identifier } = jwplayerInfo;
    if (!jwplayerPlaylist.length) return;

    const waveformer = backgroundPhoto
      ? {}
      : { waveformer: 'jw-holder' };
    // Load IA Player & tack on JWP listeners
    const baseConfig = {
      so: true,
      audio: true,
      identifier,
      hide_list: true,
      responsive: true,
      onPlaylistItem: this.onPlaylistItemCB,
      onReady: (jwplayerInstance) => {
        /**
         * Capture if player starts on track N+1
         */
        const trackIdx = jwplayerInstance.getPlaylistIndex();
        const trackNumber = trackIdx + 1;
        this.setState({ trackNumber, jwplayerInstance }, () => {
          if (jwplayerStartingPoint) {
            /**
             * tell main app to start here
             * so 3rd party players can start there as well
             */
            this.setState({ startingOnTrack: trackNumber }, () => {
              jwplayerStartingPoint(trackNumber);
            });
          }

          /* JWP listeners to track player states */
          this.state.jwplayerInstance.on('complete', () => {
            this.setState({ trackStarting: false, playerEverStarted: true });
          });

          this.state.jwplayerInstance.on('paused', () => {
            this.setState({ trackStarting: false, playerEverStarted: true });
          });
        });
      },
    };

    if (window.Play && Play) {
      const compiledConfig = Object.assign({}, baseConfig, waveformer);
      const player = Play(jwplayerID, jwplayerPlaylist, compiledConfig);
      this.setState({ player });

      if (onRegistrationComplete) {
        /**
         * Currently, this is where we support external ability to set URL
         * through Internet Archive's JWPlayer Wrapper
         */
        onRegistrationComplete(this.setURL);
      }
    }
  }

  /**
   * We track when:
   * - Play8 is loaded
   * - track is playing
   * - autoplay is happening
   * - to change next track
   *
   * @inheritdoc
   */
  componentDidUpdate(prevProps, prevState) {
    const { sourceData: { index: incomingTrackNum = null } } = this.props;
    const {
      playerReady, playlistLoadCount, playerEverStarted, jwplayerInstance, trackNumber, trackStarting
    } = this.state;
    const { sourceData: prevSourceData } = prevProps;
    const { index: prevIndex } = prevSourceData;
    const trackN = parseInt(incomingTrackNum, 10);
    const isNowMainPlayer = !prevSourceData.hasOwnProperty('index') && trackN;
    const unsupportedAlbumView = incomingTrackNum === 0; // 0 = album for 3d party players

    if (!jwplayerInstance
      || unsupportedAlbumView
      || Number.isNaN(trackN)
      || (trackN < 0)
      || isNowMainPlayer
    ) {
      return;
    }

    const playerStatus = jwplayerInstance.getState();
    const jwpPlayingOnColdLoad = prevIndex === null && incomingTrackNum >= 1;
    const incomingTrackChange = !jwpPlayingOnColdLoad && (incomingTrackNum > prevIndex) || (trackNumber !== incomingTrackNum);
    const autoplaying = incomingTrackChange && (playerStatus === 'idle');

    const iaPlayerisReady = playlistLoadCount === this.maxPlaylistLoadsUntilPlayerIsReady;
    if (!playerReady && iaPlayerisReady) {
      /** IA player starting, let's tell main app where we are starting */
      this.updateAndPlayTrack({
        playerReady: true,
        trackNumber: incomingTrackNum,
      }, !autoplaying);
      return;
    }

    if (!prevState.playerReady && playerReady) {
      /** Play8 w/ JWP is now ready & at rest, we can also rest */
      return;
    }

    if (!playerEverStarted) {
      // First song to play
      this.updateAndPlayTrack({
        trackNumber: incomingTrackNum,
        playerEverStarted: true,
        playerReady: true
      });
      return;
    }

    const trackStarted = !prevState.trackStarting && trackStarting;
    const trackEnded = prevState.trackStarting && !trackStarting;

    if (trackStarted || trackEnded) {
      /** we are inbetween track playing */
      return;
    }

    if (autoplaying) {
      /** update track pointer as play continues */
      this.updateAndPlayTrack({ trackNumber: incomingTrackNum }, false);
      return;
    }

    const trackChange = incomingTrackNum !== trackNumber;
    if (trackChange) {
      this.updateAndPlayTrack({ trackNumber: incomingTrackNum });
    }
  }

  /**
   * Event Handler that fires when JWPlayer starts a new track
   * (eg: controlbar or auto-advance, player starting on track N+1)
   *
   * @param { object } jwplayer - instance
   * @param { event } event - incoming track info
  */
  onPlaylistItemCB(jwplayer, event) {
    const { index: incomingTrackIdx } = event;
    const {
      trackNumber,
      playlistLoadCount,
    } = this.state;
    const { jwplayerStartingPoint } = this.props;
    const callCount = playlistLoadCount + 1;
    const newState = { playlistLoadCount: callCount };

    if (callCount < this.maxPlaylistLoadsUntilPlayerIsReady) {
      this.setState(newState);
      return;
    }

    if (callCount === this.maxPlaylistLoadsUntilPlayerIsReady) {
      // finally, Play8 class is ready.
      this.setState({ ...newState, startingOnTrack: incomingTrackIdx }, () => {
        if (jwplayerStartingPoint) {
          jwplayerStartingPoint(incomingTrackIdx + 1);
        }
      });
      return;
    }

    if (trackNumber !== incomingTrackIdx + 1) {
      const { jwplayerPlaylistChange } = this.props;
      jwplayerPlaylistChange(incomingTrackIdx + 1);
    }
  }

  /**
   * Signals to IA's jwplayer handler, Play8,
   * that it's time to change the URL to match given track
   *
   * @param { number } trackNumber
   */
  setURL(trackNumber) {
    const { player } = this.state;
    const playlistIndex = trackNumber - 1 || 0;
    return player.playN(playlistIndex, true);
  }

  /**
   * This updates internal state & then tells jwplayer/Play8 to start playing track
   *
   * @param { Object } stateToUpdate
   * @param { number } stateToUpdate.trackNumber - Track index to play. *Required
   * @param { * } stateToUpdate[param] - optional states to update
   * @param { boolean } playTrack -
   */
  updateAndPlayTrack(stateToUpdate, playTrack = true) {
    const { trackNumber } = stateToUpdate;
    const { player } = this.state;
    this.setState({ ...stateToUpdate, trackStarting: true }, () => {
      if (playTrack) {
        const trackIdx = trackNumber - 1 || 0;
        player.playN(trackIdx);
      }
    });
  }

  render() {
    const { jwplayerID, style } = this.props;
    return (
      <div className="ia-player-wrapper" style={style}>
        <div className="iaux-player-wrapper">
          <div id={jwplayerID} />
        </div>
      </div>
    );
  }
}

ArchiveAudioPlayer.displayName = 'ArchiveAudioPlayer';

ArchiveAudioPlayer.defaultProps = {
  backgroundPhoto: '',
  jwplayerID: '',
  jwplayerPlaylistChange: null,
  jwplayerInfo: {},
  sourceData: null,
  onRegistrationComplete: null,
  style: '',
  jwplayerStartingPoint: null
};

ArchiveAudioPlayer.propTypes = {
  backgroundPhoto: PropTypes.string,
  jwplayerID: PropTypes.string,
  jwplayerPlaylistChange: PropTypes.func,
  jwplayerStartingPoint: PropTypes.func,
  jwplayerInfo: PropTypes.shape({
    jwplayerPlaylist: PropTypes.array,
    identifier: PropTypes.string
  }),
  sourceData: PropTypes.shape({
    index: PropTypes.number
  }),
  onRegistrationComplete: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object
};

export default ArchiveAudioPlayer;
