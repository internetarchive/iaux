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
      playerPlaylistIndex: null,
      playlistLoadCount: 0,
      playerReady: false,
      startingOnTrack: 0,
      playerEverStarted: false,
      trackStarting: false,
    };

    this.onPlaylistItemCB = this.onPlaylistItemCB.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.setURL = this.setURL.bind(this);
    this.yayPlayerIsReady = this.yayPlayerIsReady.bind(this);

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
        const playerPlaylistIndex = jwplayerInstance.getPlaylistIndex();
        this.setState({ playerPlaylistIndex, jwplayerInstance }, () => {
          debugger;
          console.log("onReady - jwplayerStartingPoint - ", this.props?.jwplayerStartingPoint);
          this.props?.jwplayerStartingPoint(playerPlaylistIndex);

          this.state.jwplayerInstance.on('complete', (e) => {
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

  yayPlayerIsReady() {
    this.setState({ playerReady: true });
  }

  /**
   * Check if track index has changed. If so, then play that track
   */
  componentDidUpdate(prevProps, prevState) {
    const { sourceData: { index: incomingTrackIndex = null } } = this.props;
    const {
      playerReady, playlistLoadCount, playerEverStarted, jwplayerInstance, playerPlaylistIndex, startingOnTrack, trackStarting
    } = this.state;
    const { sourceData: prevSourceData } = prevProps;
    const { index: prevIndex } = prevSourceData;
    const indexIsNumber = Number.isInteger(incomingTrackIndex);

    if (!indexIsNumber) return;

    const isNowMainPlayer = !prevSourceData.hasOwnProperty('index') && indexIsNumber;

    if (isNowMainPlayer) {
      // do not autoplay this track any longer
      return;
    }

    if (!playerReady && playlistLoadCount === this.maxPlaylistLoadsUntilPlayerIsReady) {
      this.yayPlayerIsReady();
      return;
    }

    if (!prevState.playerReady && playerReady) {
      // Play8 w/ JWP is now ready & at rest.
      return;
    }
    const jwplayerTrack = jwplayerInstance.getPlaylistIndex();
    const playerStatus = jwplayerInstance.getState();

    const incomingTrackChange = incomingTrackIndex > prevIndex || (playerPlaylistIndex !== incomingTrackIndex);

    const isOnSameTrack = playerPlaylistIndex === incomingTrackIndex;

    const autoplaying = incomingTrackChange && (playerStatus === 'idle');


    if (!playerEverStarted) {
      // First song to play
      this.playTrack({ playerPlaylistIndex: incomingTrackIndex, playerEverStarted: true });
      return;
    }

    if (!prevState.trackStarting && trackStarting) {
      // let this track continue
      console.log('!prevState.trackStarting && trackStarting', prevState.trackStarting, trackStarting);
      return;
    }

    if (prevState.trackStarting && !trackStarting) {
      // track has ended
      console.log('prevState.trackStarting && !trackStarting', prevState.trackStarting, trackStarting);
      return;
    }

    if ( playerStatus === 'complete') {
      console.log('track complete', { playerStatus, incomingTrackIndex, });

      return;
    }
    // if (!prevState.playerEverStarted && playerEverStarted) {
    //   // let this track continue
    //   console.log('!prevState.playerEverStarted && playerEverStarted', playerEverStarted);
    //   return;
    // }

    console.log('***** just conna play incomingTrack', {
      autoplaying,
      playerStatus,
      trackStarting,
      playerPlaylistIndex,
      incomingTrackIndex,
      isOnSameTrack,
      sourceData: this.props.sourceData
    });


    // const isAutoPlaying = prevState.player;
    if (!autoplaying  && (incomingTrackIndex !== playerPlaylistIndex) ) {
      this.playTrack({ playerPlaylistIndex: incomingTrackIndex });
    }
  }

  /**
   * Event Handler that fires when JWPlayer starts a new track (eg: controlbar or auto-advance)
   */
  onPlaylistItemCB(jwplayer, event) {
    const { index } = event;
    const {
      playerPlaylistIndex,
      playlistLoadCount,
    } = this.state;
    const callCount = playlistLoadCount + 1;
    const newState = { playlistLoadCount: callCount };

    if (callCount < this.maxPlaylistLoadsUntilPlayerIsReady) {
      this.setState(newState);
      return;
    }

    if (callCount === this.maxPlaylistLoadsUntilPlayerIsReady) {
      this.setState({ ...newState, startingOnTrack: index }, () => {
        console.log("onPlaylistItemCB - jwplayerStartingPoint - ", index);
        this.props?.jwplayerStartingPoint(playerPlaylistIndex);
      });
      return;
    }

    console.log(' **** onPlaylistItemCB end of ', { playerPlaylistIndex, index });


    if (playerPlaylistIndex !== index) {
      const { jwplayerPlaylistChange } = this.props;
      jwplayerPlaylistChange({ newTrackIndex: index });
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
   * @param { number } stateToUpdate.playerPlaylistIndex - Track index to play. *Required
   * @param { * } stateToUpdate[param] - optional states to update
   */
  playTrack(stateToUpdate) {
    const { playerPlaylistIndex } = stateToUpdate;
    const { player } = this.state;

    this.setState({ ...stateToUpdate, trackStarting: true }, () => {
      player.playN(playerPlaylistIndex);
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
