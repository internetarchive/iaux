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
      playerPlaylistIndex: 0,
    };

    this.registerPlayer = this.registerPlayer.bind(this);
    this.onPlaylistItemCB = this.onPlaylistItemCB.bind(this);
    this.emitPlaylistChange = this.emitPlaylistChange.bind(this);
    this.onReady = this.onReady.bind(this);
  }

  componentDidMount() {
    this.registerPlayer();
  }

  /**
   * Check if Track index has changed,
   * if so, then play that track
   */
  componentDidUpdate({ sourceData: { index: prevIndex } }, { playerPlaylistIndex: prevPlaylistIndex }) {
    const { player, playerPlaylistIndex } = this.state;
    const { sourceData: { index } } = this.props;

    const propsIndexChanged = prevIndex !== index;
    const playerIndexChanged = prevPlaylistIndex !== playerPlaylistIndex;
    const manuallyJumpToTrack = propsIndexChanged && !playerIndexChanged;

    if (manuallyJumpToTrack) {
      return player.playN(index);
    }

    return null;
  }

  /**
   * Event Handler that fires when JWPlayer starts a new track
   */
  onPlaylistItemCB({ index: eventIndex }) {
    const { sourceData: { index: sourceDataIndex } } = this.props;
    const controllerIndex = sourceDataIndex;
    const playerPlaylistIndex = eventIndex;
    if (controllerIndex === playerPlaylistIndex) return;

    this.setState({ playerPlaylistIndex }, this.emitPlaylistChange);
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
   * Fires callback `jwplayerPlaylistChange` given by props
   */
  emitPlaylistChange() {
    const { playerPlaylistIndex } = this.state;
    const { jwplayerPlaylistChange } = this.props;

    jwplayerPlaylistChange({ newTrackIndex: playerPlaylistIndex });
  }

  render() {
    const {
      jwplayerID
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
};

ArchiveAudioPlayer.propTypes = {
  backgroundPhoto: PropTypes.string,
  photoAltTag: PropTypes.string,
  jwplayerID: PropTypes.string,
  jwplayerPlaylistChange: PropTypes.func.isRequired,
  jwPlayerPlaylist: PropTypes.array.isRequired,
  jwplayerInfo: PropTypes.object.isRequired,
  sourceData: PropTypes.object.isRequired,
};

export default ArchiveAudioPlayer;
