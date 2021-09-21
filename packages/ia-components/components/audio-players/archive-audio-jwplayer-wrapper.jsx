import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * IA Audio Player
 * Uses global: Play class (IA JWPlayer wrapper), jwplayer
 *
 * It will display photo if given, and will overlay the media player at the base of the photo.
 *
 */
class ArchiveAudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.jwPlayerInstance = React.createRef();

    // expecting jwplayer to be globally ready
    this.state = {
      player: null,
      jwplayerInstance: null,
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
      jwplayerInfo, jwplayerID, backgroundPhoto, onRegistrationComplete
    } = this.props;
    const { jwplayerPlaylist, identifier } = jwplayerInfo;
    if (!jwplayerPlaylist.length) return;

    const waveformer = backgroundPhoto
      ? {}
      : { waveformer: 'jw-holder' };
    // We are using IA custom global Player class to instatiate the player
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
        const trackNumber = jwplayerInstance.getPlaylistIndex();
        this.setState({ trackNumber, jwplayerInstance }, () => {
          console.log("onReady - jwplayerStartingPoint - ", this.props?.jwplayerStartingPoint);
          this.props?.jwplayerStartingPoint(trackNumber + 1);

          this.state.jwplayerInstance.on('complete', (e) => {
            this.setState({ trackStarting: false, playerEverStarted: true });
          });

          this.state.jwplayerInstance.on('paused', (e) => {
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
   * Check if track index has changed. If so, then play that track
   */
  componentDidUpdate(prevProps, prevState) {
    const { sourceData: { index: incomingTrackNum = null } } = this.props;
    const {
      playerReady, playlistLoadCount, playerEverStarted, jwplayerInstance, trackNumber, startingOnTrack, trackStarting
    } = this.state;
    const { sourceData: prevSourceData } = prevProps;
    const { index: prevIndex } = prevSourceData;
    const idxN = parseInt(incomingTrackNum);
    const unsupportedAlbumView = incomingTrackNum === 0; // 0 = album for 3d party players

    if (!jwplayerInstance || Number.isNaN(idxN) || (idxN < 0) || unsupportedAlbumView) return;

    const isNowMainPlayer = !prevSourceData.hasOwnProperty('index') && idxN;

    if (isNowMainPlayer) {
      // do not autoplay this track any longer
      return;
    }

    if (!playerReady && playlistLoadCount === this.maxPlaylistLoadsUntilPlayerIsReady) {
      this.updateAndPlayTrack({
        playerReady: true,
        trackNumber: incomingTrackNum,
      });
      return;
    }

    if (!prevState.playerReady && playerReady) {
      // Play8 w/ JWP is now ready & at rest.
      return;
    }
    const playerStatus = jwplayerInstance.getState();
    const incomingTrackChange = incomingTrackNum > prevIndex || (trackNumber !== incomingTrackNum);
    const isOnSameTrack = trackNumber === incomingTrackNum;
    const autoplaying = incomingTrackChange && (playerStatus === 'idle');

    if (!playerEverStarted) {
      // First song to play
      this.updateAndPlayTrack({ trackNumber: incomingTrackNum, playerEverStarted: true, playerReady: true  });
      return;
    }

    const trackStarted = !prevState.trackStarting && trackStarting;
    const trackEnded = prevState.trackStarting && !trackStarting;
    if (unsupportedAlbumView || trackStarted || trackEnded) {
      console.log('album || trackStarted || trackEnded -- album, prevState.trackStarting, trackStarting: ', album, prevState.trackStarting, trackStarting);
      return;
    }

    console.log('***** just conna play incomingTrack', {
      autoplaying,
      playerStatus,
      trackStarting,
      trackNumber,
      incomingTrackNum,
      isOnSameTrack,
      sourceData: this.props.sourceData
    });

    if (autoplaying) {
      // just update pointer as play continues
      console.log('autoplaying --- ', incomingTrackNum);
      this.updateAndPlayTrack({ trackNumber: incomingTrackNum }, false);
      return;
    }

    const trackChange = incomingTrackNum !== trackNumber;
    if (trackChange) {
      console.log("*** DID UPDATE - incomingTrackNum", {incomingTrackNum, trackNumber});
      this.updateAndPlayTrack({ trackNumber: incomingTrackNum });
    }
  }

  /**
   * Event Handler that fires when JWPlayer starts a new track (eg: controlbar or auto-advance)
   */
  onPlaylistItemCB(jwplayer, event) {
    const { index: incomingTrackIdx } = event;
    const {
      trackNumber,
      playlistLoadCount,
    } = this.state;
    const callCount = playlistLoadCount + 1;
    const newState = { playlistLoadCount: callCount };

    if (callCount < this.maxPlaylistLoadsUntilPlayerIsReady) {
      this.setState(newState);
      return;
    }

    if (callCount === this.maxPlaylistLoadsUntilPlayerIsReady) {
      // finally, Play8 class is ready.
      this.setState({ ...newState, startingOnTrack: incomingTrackIdx }, () => {
        this.props?.jwplayerStartingPoint(incomingTrackIdx + 1);
      });
      return;
    }

    console.log(' **** onPlaylistItemCB end of ', { trackNumber, incomingTrackIdx, event });

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
    console.log('~~~~ updateAndPlayTrack - stateToUpdate, playTrack: ', stateToUpdate, playTrack);
    this.setState({ ...stateToUpdate, trackStarting: true }, () => {
      if (playTrack) {
        const playlistIndex = trackNumber - 1 || 0;
        player.playN(playlistIndex);
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
  style: ''
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
  style: PropTypes.object
};

export default ArchiveAudioPlayer;
