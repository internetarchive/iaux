/* eslint-disable react/self-closing-comp */ /** for web component */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { find, flatten, head } from 'lodash';

import flattenAlbumData from './utils/flatten-album-data';
import getTrackListBySource from './utils/get-track-list-by-source';

import YoutubeIcon from '../../svgs/youtube-logo-icon';
import SpotifyIcon from '../../svgs/spotify-logo-icon';
import ArchiveIcon from '../../svgs/ia-logo-white-icon';
import BookletIcon from '../../svgs/icon-booklet';
import TheatreAudioPlayer from '../../audio-players/audio-player-main';
import TheatreTrackList from '../../track-lists/track-list';

/**
 * Create the channel label to display in channel selector
 * @param { string } channel
 * @param { string } labelValue
 */
const getChannelLabelToDisplay = ({ channel, labelValue, title }) => {
  const label = <span className="channel-label">{ labelValue }</span>;
  const iconOptions = {
    youtube: <YoutubeIcon className="channel-icon" title={title} />,
    spotify: <SpotifyIcon className="channel-icon" title={title} />,
    linerNotes: <BookletIcon className="channel-icon" title={title} />,
    default: <ArchiveIcon className="channel-icon" title={title} />,
  };
  const icon = iconOptions[channel] || iconOptions.default;

  return (
    <Fragment>
      {icon}
      {label}
    </Fragment>
  );
};

getChannelLabelToDisplay.defaultProps = {
  channel: ''
};

getChannelLabelToDisplay.propTypes = {
  channel: PropTypes.string,
  labelValue: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

/**
 * AudioPlayerWithYoutubeSpotify
 * Controller to keep Audio player & tracklist in sync
 *
 * Responsible for:
 * Data formation:
 *   - creates track list by channel
 *   - gets track metadata that is currently playing
 * Event callbacks:
 *   - when user selects a channel
 *   - when jwplayer starts a new track to play
 *   - when user selects a track item
 *
 * Expected behavior during:
 * - On load: flatted album data
 *   - takes the JSON output from IA's Item class
 *   - organize item's files & metadata to a useable state
 *   - this includes nesting related files inside of original files
 * - On channel switch:
 *   - get tracks playable for channel
 *   - get info for track to play
 *   - album item displays first on tracklist
 *   - if track has been selected previously, keep highlighted
 * - On track change:
 *   - update the URL via JWPlayer/Play8
 *
 * @params see PropTypes
 */
class AudioPlayerWithYoutubeSpotify extends Component {
  constructor(props) {
    super(props);

    const { albumMetadata, playFullIAAudio } = props;
    const albumData = flattenAlbumData(albumMetadata, playFullIAAudio);
    this.state = {
      albumData,
      tracklistToShow: [],
      channelToPlay: 'archive',
      trackStartingPoint: null,
      trackSelected: null, /* 0 = album */
      urlSetterFN: null,
    };

    [
      'selectThisTrack',
      'onChannelSelect',
      'jwplayerPlaylistChange',
      'jwplayerStartingPoint',
      'getSelectableChannels',
      'getAudioSourceInfoToPlay',
      'receiveURLSetter',
      'updateURL',
      'youtubePlaylistChange',
      'getTrackToHighlight'
    ].forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { albumMetadata = {}, playFullIAAudio } = props;
    const { metadata = {} } = albumMetadata;
    const { identifier } = metadata;
    const { albumData: stateData } = state;

    let albumData = stateData;
    if (identifier[0] !== stateData.identifier[0]) {
      albumData = flattenAlbumData(albumMetadata, playFullIAAudio);
    }
    const tracklistToShow = getTrackListBySource(albumData, state.channelToPlay);

    return {
      albumData,
      tracklistToShow,
    };
  }

  componentDidMount() {
    /** Set up <channel-selector> with available channels */
    const channelSelector = document.querySelector('channel-selector');
    const options = this.getSelectableChannels();
    const { albumData } = this.state;

    channelSelector.samples = albumData.playSamples || false;
    channelSelector.spotify = options.find(option => option.value === 'spotify');
    channelSelector.youtube = options.find(option => option.value === 'youtube');

    channelSelector.addEventListener('channelChange', this.onChannelSelect);
  }

  /**
   * Callback every time user selects a channel
   */
  onChannelSelect(event) {
    const { albumData, channelToPlay: currentSource } = this.state;
    let newSource = event.detail.channel;

    if (newSource === 'beta') {
      // handle cookie setting at IA level
      return;
    }

    if (newSource === 'ia') {
      newSource = 'archive';
    }

    if (window.archive_analytics) {
      const label = `Channel-${newSource}`;
      window.archive_analytics.send_event('Audio-Player', label);
    }

    if (currentSource === newSource || newSource === 'webamp') return;

    // if source has changed, then update source state & tracklisting
    const tracklistToShow = getTrackListBySource(albumData, newSource);
    const channelToPlay = newSource;

    this.setState({ channelToPlay, tracklistToShow }, this.updateURL);
  }

  /**
   * Find the right audio metadata depending on the channel and track number
   * Archive track list
   *   - will never have a full album option,
   *     - default to track 1 album was selected prior.
   * YouTube/Spotify
   *   - default to first available track if it doesn't have it
   *   - may have full album option
   *   - may not have all of the songs
   */
  getAudioSourceInfoToPlay() {
    const {
      channelToPlay, trackSelected, tracklistToShow, trackStartingPoint
    } = this.state;

    let audioSource;

    if (channelToPlay === 'archive') {
      audioSource = { index: trackSelected };
      return audioSource;
    }

    // it's youtube or spotify
    const playerLoadingOnCertainTrack = trackSelected === null && trackStartingPoint > 0;
    const trackToHighlight = playerLoadingOnCertainTrack ? trackStartingPoint : trackSelected;

    const trackInfo = find(tracklistToShow, (track) => {
      const trackFound = track.trackNumber === trackToHighlight;
      if (trackFound) {
        return track;
      }
    });
    audioSource = trackInfo || head(tracklistToShow);
    return audioSource || {};
  }

  /**
   * Finds the track to highlight for the track listing
   *
   * @param { object } audioSource
   * @param audioSource.index - JWPlayer audio source
   * @param audioSource.trackNumber - Third party audio source
   */
  getTrackToHighlight(audioSource) {
    const { trackSelected, trackStartingPoint } = this.state;
    if (parseInt(audioSource.index, 10) >= 0) {
      // has available track number to refer to, archive player
      return audioSource.index;
    }

    if (trackSelected === null && trackStartingPoint >= 0) {
      return audioSource.trackNumber || trackStartingPoint;
    }

    if (parseInt(audioSource.trackNumber, 10)) {
      // has available track number to refer to, third party
      return audioSource.trackNumber;
    }

    // no highlight
    return null;
  }

  /**
   * Find the available channels that the album/item can play
   */
  getSelectableChannels() {
    const {
      albumData: { externalSources, playSamples, externalSourcesDisplayValues }
    } = this.state;
    const channelsToDisplay = flatten(['archive', externalSources, 'webamp']);
    const channelOptions = channelsToDisplay.map((channel) => {
      if (channel === 'webamp') {
        const webampLink = (
          <a
            href={`${window.location.href}?&webamp=1`}
            alt="play Webamp"
            className="webamp-link"
            data-event-click-tracking="Audio-Player|Channel-Webamp"
          >
            <img src="/images/llama-icon.png" alt="webamp" />
            <span className="channel-label">Webamp</span>
          </a>
        );
        return {
          displayAsIs: true,
          asIsDisplay: webampLink
        };
      }

      let labelValue;

      if (channel === 'archive') {
        labelValue = `${playSamples ? 'Samples' : 'Internet Archive'}`;
      } else {
        labelValue = externalSourcesDisplayValues[channel] || '';
      }
      return {
        value: channel,
        label: getChannelLabelToDisplay({ channel, labelValue, title: `play ${labelValue}` }),
        clickTrackValue: `Audio-Player|Channel-${labelValue}`,
      };
    });

    return channelOptions;
  }

  /**
   * Fires the external URL setter function to update the URL
   */
  updateURL() {
    const { trackSelected, urlSetterFN, channelToPlay } = this.state;
    const trackRefersToAlbum = trackSelected === 0;
    const trackGetsURL = Number.isInteger(trackSelected) && !trackRefersToAlbum;
    const isThirdPartyChannel = channelToPlay !== 'archive';
    if (isThirdPartyChannel && trackGetsURL && urlSetterFN) {
      urlSetterFN(trackSelected);
    }
  }

  /* CALLBACKS */
  /**
   * Callback every time YoutubePlayer changes track
   * @param { number } prevTrack- Track number of previously played video
   */
  youtubePlaylistChange(prevTrack, setURLOnly) {
    const { tracklistToShow, trackSelected: currentTrack } = this.state;
    let trackSelected;
    if (setURLOnly) {
      trackSelected = tracklistToShow.find(t => t.trackNumber === prevTrack);
    } else {
      trackSelected = tracklistToShow.find(t => t.trackNumber >= prevTrack + 1);
    }
    // Find next track number in line
    if (trackSelected) {
      this.setState({ trackSelected: trackSelected.trackNumber }, () => {
        if (currentTrack !== trackSelected.trackNumber) {
          this.updateURL();
        }
      });
    }
  }

  /**
   * Callback every time user selects a track from the tracklist
   * @param { object } event - React synthetic event
   */
  selectThisTrack(event) {
    const selected = event.currentTarget;
    const selectedTrackNumber = parseInt(selected.getAttribute('data-track-number'), 10);

    this.setState({
      trackSelected: selectedTrackNumber
    }, this.updateURL);
  }

  /**
   * Callback every time JWPlayer plays a track
   * @param { number } trackSelected
   */
  jwplayerPlaylistChange(trackSelected) {
    this.setState({ trackSelected });
  }

  /**
   * Callback to Save URL Setter function that comes back from Play8 instantiation
   */
  receiveURLSetter(urlSetterFN) {
    this.setState({ urlSetterFN });
  }

  /**
   * Callback when JWPlayer loads for the first time & it starts on a different track
   * @param { trackStartingPoint } album track number upon cold start
   */
  jwplayerStartingPoint(trackStartingPoint) {
    this.setState({ trackStartingPoint });
  }
  /* END CALLBACKS */

  render() {
    const {
      jwplayerPlaylist, linerNotes, albumMetadata, userSignedIn, baseHost
    } = this.props;
    const { tracklistToShow, channelToPlay, albumData } = this.state;
    const {
      albumMetadaToDisplay,
      itemPhoto,
      externalSourcesDisplayValues,
      playSamples,
    } = albumData;
    const {
      title,
      identifier,
      creator
    } = albumMetadaToDisplay;
    let audioPlayerChannelLabel;
    const isArchiveChannel = channelToPlay === 'archive';
    if (isArchiveChannel) {
      audioPlayerChannelLabel = `${playSamples ? ' Samples' : 'Internet Archive'}`;
    } else {
      audioPlayerChannelLabel = externalSourcesDisplayValues[channelToPlay] || '';
    }
    const jwplayerInfo = {
      jwplayerPlaylist,
      identifier,
    };
    const jwplayerID = identifier.replace(/[^a-zA-Z\d]/g, '');
    const audioSource = this.getAudioSourceInfoToPlay();
    const trackToHighlight = this.getTrackToHighlight(audioSource);
    const contentBoxTabs = {
      player: getChannelLabelToDisplay({
        channel: channelToPlay,
        labelValue: audioPlayerChannelLabel,
        title: `playing from ${channelToPlay}`
      }),
      linerNotes: getChannelLabelToDisplay({
        channel: 'linerNotes',
        labelValue: 'Liner Notes',
        title: 'view liner notes'
      })
    };
    return (
      <div className="theatre__wrap audio-with-youtube-spotify">
        <div className="channel-selector">
          <channel-selector beta className="focus-on-child-only"></channel-selector>
        </div>
        <section className="media-section">
          <TheatreAudioPlayer
            source={channelToPlay}
            backgroundPhoto={itemPhoto}
            sourceData={audioSource}
            customSourceLabels={contentBoxTabs}
            linerNotes={linerNotes}
            albumMetadata={albumMetadata}
            userSignedIn={userSignedIn}
            baseHost={baseHost}
            jwplayerPlaylistChange={this.jwplayerPlaylistChange}
            jwplayerStartingPoint={this.jwplayerStartingPoint}
            youtubePlaylistChange={this.youtubePlaylistChange}
            jwplayerInfo={jwplayerInfo}
            jwplayerID={`jwplayer-${jwplayerID}`}
            onRegistrationComplete={this.receiveURLSetter}
            playlist={tracklistToShow}
          />
        </section>
        <div className="playlist-area">
          <section className="playlist-section">
            <TheatreTrackList
              tracks={tracklistToShow}
              onSelected={this.selectThisTrack}
              selectedTrack={trackToHighlight} // trackStartingPoint
              albumName={title}
              displayTrackNumbers={isArchiveChannel}
              creator={creator}
              dataEventCategory="Audio-Player"
            />
          </section>
        </div>
      </div>
    );
  }
}

AudioPlayerWithYoutubeSpotify.displayName = 'AudioPlayerWithYoutubeSpotify';

AudioPlayerWithYoutubeSpotify.defaultProps = {
  jwplayerPlaylist: null,
  playFullIAAudio: false,
  linerNotes: null,
  userSignedIn: false,
  albumMetadata: null,
  baseHost: 'archive.org'
};

AudioPlayerWithYoutubeSpotify.propTypes = {
  albumMetadata: PropTypes.object,
  jwplayerPlaylist: PropTypes.array,
  playFullIAAudio: PropTypes.bool,
  linerNotes: PropTypes.object,
  userSignedIn: PropTypes.bool,
  baseHost: PropTypes.string
};

export default AudioPlayerWithYoutubeSpotify;
