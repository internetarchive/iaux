import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * IA Audio Player
 * Uses global: Play class (IA JWPlayer wrapper), jwplayer
 *
 * It will display photo if given, and will overlay the media player at the base of the photo.
 *
 * Development is in lock-step with Play8.js.
 * ANY changes to Play8.js may need to be addressed here also.
 */
class ArchiveAudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.jwPlayerInstance = React.createRef();

    // expecting jwplayer to be globally ready
    this.state = {
      player: null,
      playerPlaylistIndex: null,
    };

    this.registerPlayer = this.registerPlayer.bind(this);
    this.emitPlaylistChange = this.emitPlaylistChange.bind(this);
    this.postRegistration = this.postRegistration.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onPlaylistItemCB = this.onPlaylistItemCB.bind(this);
  }

  componentDidMount() {
    this.registerPlayer();
  }

  /**
   * Check if Track index has changed,
   * if so, then play that track
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      player,
      playerPlaylistIndex,
    } = this.state;
    const {
      playerPlaylistIndex: prevPlayIndex,
    } = prevState;
    const { jwplayerID, sourceData: { index = null } } = this.props;

    console.log('IAUX: componentDidUpdate props, state', this.props, this.state);

    const indexHasBeenSet = Number.isInteger(index);
    if (!indexHasBeenSet)
      return;

    // figure out if we're handling a change due to either playlist change, user click, or neither.
    const userEvent = this.props.sourceData.userEvent
    // NOTE: _technically_ this isn't needed/used right now - but it might if
    //       player.playN() with 3 args (to change the url but not play) returns..
    const changed = (
      prevPlayIndex !== playerPlaylistIndex  ||
      prevProps.sourceData.index !== this.props.sourceData.index
    );
    console.log('IAUX changed?', { changed, userEvent }, 'was:', prevProps, prevState);
    if (!changed  &&  !userEvent)
      return;

    // This changes the track:
    // when user clicks on an item on the track list
    if (userEvent)
      player.playN(index)
  }

  /**
   * Event Handler that fires when JWPlayer starts a new track
   */
  onPlaylistItemCB(jwplayer, event) {
    console.log('IAUX: onPlaylistItemCB event, props', event, this.props);

    const { index: playerPlaylistIndex } = event;
    this.setState({ playerPlaylistIndex },
      () => {
        console.log('IAUX: FIRED emitPlaylistChange in onPlaylistItemCB', playerPlaylistIndex);
        this.emitPlaylistChange(playerPlaylistIndex);
      });
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
    this.postRegistration();
  }

  /**
   * Register this instance of JWPlayer
   */
  registerPlayer() {
    const { jwplayerInfo, jwplayerID, backgroundPhoto } = this.props;
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
      onReady: this.onReady,
      onPlaylistItem: this.onPlaylistItemCB,
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
