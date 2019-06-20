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
      initiatePlay: false,
      paused: false,
      player: null,
      playerPlaylistIndex: null,
      startingAt: null,
      startingAtCaptured: false,
    };

    this.checkIfPlayerStartsAtN = this.checkIfPlayerStartsAtN.bind(this);
    this.initiatePlay = this.initiatePlay.bind(this);
    this.onPlaylistItemCB = this.onPlaylistItemCB.bind(this);
    this.registerPlayerEventHandlers = this.registerPlayerEventHandlers.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.setURL = this.setURL.bind(this);
    this.upupdatePlayerStateWhenStartingAtN = this.updatePlayerStateWhenStartingAtN.bind(this);
  }

  /**
   * Register jwplayer/play8 instance as component mounts on client
   */
  componentDidMount() {
    const {
      jwplayerInfo, jwplayerID, backgroundPhoto, onRegistrationComplete
    } = this.props;
    const { jwplayerPlaylist, identifier } = jwplayerInfo;
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
      onSetupComplete: (startPlaylistIdx) => {
        /**
         * Capture if player starts on track N+1
         */
        if (startPlaylistIdx) {
          this.setState({ startingAt: startPlaylistIdx });
        }
      }
    };

    if (window.Play && Play) {
      const compiledConfig = Object.assign({}, baseConfig, waveformer);
      const player = Play(jwplayerID, jwplayerPlaylist, compiledConfig);
      this.setState({ player }, this.registerPlayerEventHandlers);

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
    const {
      playerPlaylistIndex, initiatePlay, paused, startingAtCaptured
    } = this.state;
    const { startingAtCaptured: prevStartCaptured, paused: prevPaused } = prevState;

    const { sourceData: { index = null }, jwplayerID } = this.props;
    const { sourceData: { index: prevIndex } } = prevProps;

    const indexIsNumber = Number.isInteger(index);

    const jwplayerStartingOnACertainTrack = this.checkIfPlayerStartsAtN(index);

    if (jwplayerStartingOnACertainTrack) {
      const capturedFlagFlipped = !prevStartCaptured && startingAtCaptured;
      const stateToUpdate = {
        startingAtCaptured: indexIsNumber && !Number.isInteger(prevIndex),
        capturedFlagFlipped
      };
      this.updatePlayerStateWhenStartingAtN(stateToUpdate);
      return;
    }

    if (indexIsNumber && !initiatePlay) {
      this.initiatePlay();
      return;
    }

    const manuallyJumpToTrack = (playerPlaylistIndex !== index) && indexIsNumber && initiatePlay;
    if (manuallyJumpToTrack) {
      this.playTrack({ playerPlaylistIndex: index });
      return;
    }

    if (paused && prevPaused && index === playerPlaylistIndex) {
      /**
       * user Paused via player & then clicked on selected track item to restart
       */
      this.handlePause(false, () => jwplayer(jwplayerID).play());
    }
  }

  /**
   * Event Handler that fires when JWPlayer starts a new track (eg: controlbar or auto-advance)
   */
  onPlaylistItemCB(jwplayer, event) {
    const { index } = event;
    const { initiatePlay, startingAtCaptured } = this.state;
    const jwplayerStartingOnACertainTrack = this.checkIfPlayerStartsAtN(index);

    if (initiatePlay || (jwplayerStartingOnACertainTrack && !startingAtCaptured)) {
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
   * Signal that player is ready to go
   */
  initiatePlay() {
    this.setState({ initiatePlay: true });
  }

  /**
   * Handle all the state management when the player starts on track N+1
   *
   * Flag: startingAtCaptured
   * - this confirms that starting track number was received by top level controller
   * - if we are at this point set, the flag
   *
   * Flag: capturedFlagFlipped
   * - this confirms the point when `this.state.startingAtCaptured` internal flag has been set
   * - if we are at this point, play the track
   *
   * @param { boolean } startingAtCaptured
   * @param { boolean } capturedFlagFlipped
   */
  updatePlayerStateWhenStartingAtN({ startingAtCaptured, capturedFlagFlipped }) {
    const { startingAt } = this.state;
    const { sourceData: { index = null } } = this.props;

    if (startingAtCaptured) {
      this.setState({ startingAtCaptured });
      return;
    }

    if (!capturedFlagFlipped && index === startingAt) {
      this.playTrack({
        playerPlaylistIndex: index,
        initiatePlay: true
      });
    }
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
    this.setState(stateToUpdate, () => {
      player.playN(playerPlaylistIndex);
    });
  }

  /**
   * Captures Pause event and optional fires callbacks
   *
   * @param { boolean } paused
   * @param { function } callback - optional
   */
  handlePause(paused, callback = null) {
    this.setState({ paused }, callback);
  }

  /**
   * Registers jwplayer event handlers
   */
  registerPlayerEventHandlers() {
    const { player, initiatePlay, paused } = this.state;
    player.on('play', () => {
      if (!initiatePlay) {
        this.initiatePlay();
      }
      if (paused) {
        this.handlePause(false);
      }
    });
    player.on('pause', () => {
      this.handlePause(true);
    });
  }

  /**
   * Confirms whether or not jwplayer starts on track N+1
   *
   * @param { number|null } index
   */
  checkIfPlayerStartsAtN(index) {
    const { initiatePlay, startingAt, playerPlaylistIndex } = this.state;

    return !initiatePlay
    && startingAt
    && (index === startingAt)
    && (playerPlaylistIndex === null);
  }

  render() {
    const { jwplayerID } = this.props;

    return (
      <div className="ia-player-wrapper">
        <div className="iaux-player-wrapper">
          <div id={jwplayerID} />
        </div>
      </div>
    );
  }
}

ArchiveAudioPlayer.defaultProps = {
  backgroundPhoto: '',
  jwplayerID: '',
  jwplayerPlaylistChange: null,
  jwplayerInfo: {},
  sourceData: null,
  onRegistrationComplete: null,
};

ArchiveAudioPlayer.propTypes = {
  backgroundPhoto: PropTypes.string,
  jwplayerID: PropTypes.string,
  jwplayerPlaylistChange: PropTypes.func,
  jwplayerInfo: PropTypes.shape({
    jwplayerPlaylist: PropTypes.array,
    identifier: PropTypes.string
  }),
  sourceData: PropTypes.shape({
    index: PropTypes.number
  }),
  onRegistrationComplete: PropTypes.func,
};

export default ArchiveAudioPlayer;
