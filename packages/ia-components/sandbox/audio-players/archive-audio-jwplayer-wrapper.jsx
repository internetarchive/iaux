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

    this.onPlaylistItemCB = this.onPlaylistItemCB.bind(this);
  }

  componentDidMount() {
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
      onPlaylistItem: this.onPlaylistItemCB,
    };

    if (window.Play && Play) {
      const compiledConfig = Object.assign({}, baseConfig, waveformer);
      const player = Play(jwplayerID, jwplayerPlaylist, compiledConfig);
      this.setState({ player });
    }
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

    const indexHasBeenSet = Number.isInteger(index);
    if (!indexHasBeenSet)
      return;

    // Is this a props change? (from parent / above; eg: clicking on tracklist title/button)
    const propA = parseInt((
      prevProps  &&  prevProps.sourceData  &&  prevProps.sourceData.index
      ? prevProps.sourceData.index
      : null), 10);
    const propB = parseInt(this.props.sourceData.index, 10);
    console.log('IAUX componentDidUpdate props change?', propA, '=>', propB);

    // Is this a state change? (change from our class / we initiated; eg: jwplayer auto-advance)
    const stateA = parseInt((prevState ? prevState.playerPlaylistIndex : null), 10)
    const stateB = parseInt(this.state.playerPlaylistIndex, 10);
    console.log('IAUX componentDidUpdate state change?', stateA, '=>', stateB);

    // Tell jwplayer to change (or play if already selected) the wanted track
    player.playN(propB !== propA ? propB : stateB);
  }

  /**
   * Event Handler that fires when JWPlayer starts a new track (eg: controlbar or auto-advance)
   */
  onPlaylistItemCB(jwplayer, event) {
    console.log('IAUX: onPlaylistItemCB event, props', event, this.props);

    const playerPlaylistIndex = event.index;
    this.setState({ playerPlaylistIndex },
      () => {
        console.log('IAUX: onPlaylistItemCB setState() applied', playerPlaylistIndex);
        this.props.jwplayerPlaylistChange({ newTrackIndex: playerPlaylistIndex });
      });
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
};

export default ArchiveAudioPlayer;
