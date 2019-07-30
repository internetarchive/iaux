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
    };

    this.onPlaylistItemCB = this.onPlaylistItemCB.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.setURL = this.setURL.bind(this);
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
          this.props.jwplayerStartingPoint(playerPlaylistIndex);
        });
      }
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
  componentDidUpdate(prevProps) {
    const { sourceData: { index = null } } = this.props;
    const { sourceData: prevSourceData } = prevProps;
    const { index: prevIndex } = prevSourceData;
    const { jwplayerInstance, playerPlaylistIndex } = this.state;
    const indexIsNumber = Number.isInteger(index);

    if (!indexIsNumber) return;

    const isNowMainPlayer = !prevSourceData.hasOwnProperty('index') && indexIsNumber;

    if (isNowMainPlayer) {
      // do not autoplay this track any longer
      return;
    }
    const incomingTrackChange = index !== prevIndex;

    const isOnSameTrack = playerPlaylistIndex === index;
    const playerStatus = jwplayerInstance.getState();
    const playCurrentTrack = isOnSameTrack && (playerStatus === 'idle');
    const playTrack = indexIsNumber && (playCurrentTrack || incomingTrackChange);
    if (playTrack) {
      this.playTrack({ playerPlaylistIndex: index - 1 || 0 });
    }
  }

  /**
   * Event Handler that fires when JWPlayer starts a new track (eg: controlbar or auto-advance)
   */
  onPlaylistItemCB(jwplayer, event) {
    const { index } = event;
    const { playerPlaylistIndex } = this.state;

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
    this.setState(stateToUpdate, () => {
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
  jwplayerInfo: PropTypes.shape({
    jwplayerPlaylist: PropTypes.array,
    identifier: PropTypes.string
  }),
  sourceData: PropTypes.shape({
    index: PropTypes.number
  }),
  onRegistrationComplete: PropTypes.func,
  style: PropTypes.string
};

export default ArchiveAudioPlayer;
