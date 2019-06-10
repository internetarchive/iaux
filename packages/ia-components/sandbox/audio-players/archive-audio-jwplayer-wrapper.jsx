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
      initiatePlay: false,
      onMetaFired: false,
      startAt: null,
      jwplayerOnloadStabilized: false,
      playCBHasFired: 0,
      // This reflects the amount of cycles Play8.js uses to stabilize load
      maxTimesPlayCBToBeFiredForLoad: 2,
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

  shouldComponentUpdate(nextProps, nextState) {
    const {
      startAt,
      initiatePlay,
      jwplayerOnloadStabilized,
      playerPlaylistIndex,
    } = this.state;
    const {
      jwplayerOnloadStabilized: nextStablizerCheck,
      initiatePlay: nextInit,
      playerPlaylistIndex: nextPlaylistIndex,
    } = nextState;

    // These checks are specifically for when the player starts on track N where N > 1 (not first track)
    // We do not want any UI updates, or update event propagation when these locks open.
    // This work is complementary to `componentDidUpdate` and `onPlaylistItemCB`
    // These state updates are mandatory for autoplay to happen after load.
    if (startAt && (!jwplayerOnloadStabilized && nextStablizerCheck)) {
      // JWPlayer has finally loaded through IA's internal wrapper Play8.js
      return false;
    }
    if (startAt && jwplayerOnloadStabilized && !initiatePlay && nextInit) {
      // Play management has been initialized
      return false;
    }
    if (startAt && jwplayerOnloadStabilized && initiatePlay && !playerPlaylistIndex && nextPlaylistIndex) {
      // We have manually started the track that the player started on (N)
      return false;
    }
    return true;
  }

  /**
   * Check if Track index has changed,
   * if so, then play that track
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      player,
      playerPlaylistIndex,
      initiatePlay,
      startAt,
      jwplayerOnloadStabilized,
      onMetaFired,
    } = this.state;
    const {
      playerPlaylistIndex: prevPlayIndex,
    } = prevState;
    const { jwplayerID, sourceData: { index = null } } = this.props;

    // onMetaFired is a custom JWPlayer event, this notes when JWPlayer is really ready
    // We wait for this to fire before doing anything else
    if (!onMetaFired) return;

    const indexHasBeenSet = Number.isInteger(index);

    // When Player starts at first track, and we have set the track index, play management can start
    if (indexHasBeenSet && !initiatePlay && !Number.isInteger(startAt)) {
      return this.setState({ initiatePlay: true });
    }

    // This changes the tracks
    // When user clicks on the item on the track list
    // When JWPlayer automatically updates the track list during auto play
    const manuallyJumpToTrack = (playerPlaylistIndex !== index) && indexHasBeenSet && initiatePlay;
    if (manuallyJumpToTrack) {
      return this.setState({ playerPlaylistIndex: index }, () => player.playN(index));
    }

    // This section is when Player does not start at first track
    // Because of the way we initiate JWPlayer through IA's internal Play8.js wrapper,
    //   we have to manually do some checks.
    // This code is complementary to what is happening in `shouldComponentUpdate`
    //   and `onPlaylistItemCB`
    const playerStartingAtN = indexHasBeenSet && startAt === index && !playerPlaylistIndex;
    const trackHasBeenSet = !Number.isInteger(prevPlayIndex) && Number.isInteger(index);

    if (playerStartingAtN && !initiatePlay && trackHasBeenSet && !jwplayerOnloadStabilized) {
      // JWPlayer has finally stabilized its initial onload through IA's internal wrapper: Play8.js
      return this.setState({ jwplayerOnloadStabilized: true });
    }

    if (playerStartingAtN && !initiatePlay && jwplayerOnloadStabilized) {
      // Once load has stabilized, we can confirm play management can start
      return this.setState({ initiatePlay: true }, () => jwplayer(jwplayerID).pause());
    }

    if (startAt === index && !playerPlaylistIndex && jwplayerOnloadStabilized && initiatePlay) {
      // Manually play the track the player started on (N)
      return this.setState({ playerPlaylistIndex: index }, () => jwplayer(jwplayerID).play());
    }
  }

  /**
   * Event Handler that fires when JWPlayer starts a new track
   */
  onPlaylistItemCB(event) {
    const {
      initiatePlay,
      onMetaFired,
      playCBHasFired,
    } = this.state;

    if (!onMetaFired) return;

    const { index: playerPlaylistIndex } = event;

    if (initiatePlay) {
      this.emitPlaylistChange(playerPlaylistIndex);
    }

    const jwplayerStartingOnACertainTrack = !initiatePlay && (playerPlaylistIndex > 0);
    /*
      This area checks when player loads on a track that isn't the 1st track
      JWPlayer loads through IA's internal wrapper Play8.js
      and this fires 2x (captured in `maxTimesPlayCBToBeFiredForLoad`).
      We count callback (CB) firing when this happens and update state accordingly.

      This code is complementary to `componentDidUpdate` and `shouldComponentUpdate`
    */
    if (jwplayerStartingOnACertainTrack && !initiatePlay) {
      if (playCBHasFired === 0) {
        // capture the index where the playlist starts & start count of CB fires
        this.setState({ startAt: playerPlaylistIndex, playCBHasFired: playCBHasFired + 1 });
      }

      if (playCBHasFired === 1) {
        // Once CB has fired once, we will continue to count the CB fire
        // & emit that the player has updated index
        this.setState({ playCBHasFired: playCBHasFired + 1 },
          () => this.emitPlaylistChange(playerPlaylistIndex));
      }
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
    player.on('meta', () => this.setState({ onMetaFired: true }));
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
      : { waveformer: 'jw-holder' };
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
      onReady: this.onReady,
      responsive: true,
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
