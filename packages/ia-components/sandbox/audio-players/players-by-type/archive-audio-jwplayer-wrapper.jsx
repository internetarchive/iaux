import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * IA Audio Player
 *
 * Uses global: Play class (IA JWPlayer wrapper)
 *
 * It will display photo if given, and will overlay the media player at the base of the photo.
 */
class ArchiveAudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.jwPlayerInstance = React.createRef();

    // expecting jwplayer to be globally ready
    this.state = {
      player: null,
      playerPlaylistIndex: null,
      initiatePlay: false,
    };

    this.registerPlayer = this.registerPlayer.bind(this);
    this.onPlaylistItemCB = this.onPlaylistItemCB.bind(this);
    this.emitPlaylistChange = this.emitPlaylistChange.bind(this);
    this.postRegistration = this.postRegistration.bind(this);
    this.onReady = this.onReady.bind(this);
  }

  componentDidMount() {
    this.registerPlayer();
  }

  /**
   * Check if Track index has changed,
   * if so, then play that track
   */
  componentDidUpdate(prevProps, prevState) {
    const { player, playerPlaylistIndex, initiatePlay } = this.state;
    const { sourceData: { index = null } } = this.props;

    // if state index doesn't match props index, manually play
    const indexHasBeenSet = Number.isInteger(index);

    // if there is an index in props, but flag is false,
    // set flag to true;
    let stateUpdate = {};
    let postStateCB = null;
    if (indexHasBeenSet && !initiatePlay) {
      stateUpdate.initiatePlay = true;
    }

    const manuallyJumpToTrack = (playerPlaylistIndex !== index) && indexHasBeenSet && initiatePlay;

    if (manuallyJumpToTrack) {
      stateUpdate.playerPlaylistIndex = index;
      postStateCB = () => {
        player.playN(index);
      };
    }

    if (Object.keys(stateUpdate).length > 0) {
      this.setState(stateUpdate, postStateCB);
    }

    return null;
  }

  /**
   * Event Handler that fires when JWPlayer starts a new track
   */
  onPlaylistItemCB(event) {
    const { index: playerPlaylistIndex } = event;
    const { initiatePlay } = this.state;
    const jwplayerStartingOnACertainTrack = !initiatePlay && (playerPlaylistIndex > 0);
    if (initiatePlay || jwplayerStartingOnACertainTrack) {
      this.emitPlaylistChange(playerPlaylistIndex);
    }
  }

  /**
   * Set up event handler for JWPlayer's custom events
   * This event handler returns JWPlayer's player instance
   *
   * @param { object } jwplayerInstance
   */
  onReady(jwplayerInstance) {
    // User Play class instance to set event listeners
    const { player } = this.state;
    player.on('playlistItem', this.onPlaylistItemCB);
    this.postRegistration();
  }

  /**
   * Register this instance of JWPlayer
   */
  registerPlayer() {
    const { jwplayerInfo, jwplayerID, backgroundPhoto } = this.props;
    const { jwplayerPlaylist, identifier, collection } = jwplayerInfo;
    const waveformer = backgroundPhoto
      ? {}
      : { waveformer: 'jw-holder', responsive: true };
    // We are using IA custom global Player class to instatiate the player
    const baseConfig = {
      start: 0,
      embed: null,
      so: true,
      autoplay: false,
      width: 0,
      height: 0,
      list_height: 0,
      audio: true,
      identifier,
      collection,
      hide_list: true,
      onReady: this.onReady
    };

    if (window.Play && Play) {
      const compiledConfig = Object.assign({}, baseConfig, waveformer);
      const player = Play(jwplayerID, jwplayerPlaylist, compiledConfig);
      this.setState({ player });
    }
  }

  /**
   * Post JWPlayer registration handler - returns optional registration callback
   *
   * Currently, this is where we support external ability to set URL
   * through Internet Archive's JWPlayer Wrapper
   */
  postRegistration() {
    const { onRegistrationComplete, jwplayerInfo, needsURLSettingAccess = false } = this.props;
    const { identifier = '' } = jwplayerInfo;

    // if (onRegistrationComplete && needsURLSettingAccess) {
    //   const externallySyncURL = function externallySyncURL(identifier, trackNumber) {
    //     const playlistIndex = trackNumber - 1 || 0;
    //     if (window.Play && Play && identifier) {
    //       return Play(identifier).playN(playlistIndex, false, true);
    //     }
    //   }.bind(null, identifier);
    //   onRegistrationComplete(externallySyncURL);
    // }
  }

  /**
   * Fires callback `jwplayerPlaylistChange` given by props
   */
  emitPlaylistChange(playerPlaylistIndex) {
    const { jwplayerPlaylistChange } = this.props;

    jwplayerPlaylistChange({ newTrackIndex: playerPlaylistIndex });
  }

  render() {
    const {
      jwplayerID,
      backgroundPhoto
    } = this.props;

    // jwplayerStyleHack - specifically calling this out because
    // fix needs to be made on IA's JWPlayer wrapper style
    // issue is that waveform is still showing up in the truncated view of the player
    // adding a black background should allow for controls to be visible.
    const jwplayerStyleHack = backgroundPhoto ? { backgroundColor: 'black' } : {};
    return (
      <div className="ia-player-wrapper">
        <div className="iaux-player-wrapper" style={jwplayerStyleHack}>
          <div id={jwplayerID} />
        </div>
      </div>
    );
  }
}

ArchiveAudioPlayer.defaultProps = {
  backgroundPhoto: '',
  photoAltTag: '',
  jwplayerID: '',
  jwplayerPlaylistChange: null,
  jwPlayerPlaylist: [],
  jwplayerInfo: {},
  sourceData: null,
  onRegistrationComplete: null,
  needsURLSettingAccess: false,
};

ArchiveAudioPlayer.propTypes = {
  backgroundPhoto: PropTypes.string,
  photoAltTag: PropTypes.string,
  jwplayerID: PropTypes.string,
  jwplayerPlaylistChange: PropTypes.func,
  jwPlayerPlaylist: PropTypes.array,
  jwplayerInfo: PropTypes.object,
  sourceData: PropTypes.object,
  onRegistrationComplete: PropTypes.func,
  needsURLSettingAccess: PropTypes.bool,
};

export default ArchiveAudioPlayer;
