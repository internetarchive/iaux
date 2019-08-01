import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { find, flatten, head } from 'lodash';

import flattenAlbumData from './utils/flatten-album-data';
import getTrackListBySource from './utils/get-track-list-by-source';

import YoutubeIcon from '../../svgs/youtube-logo-icon';
import SpotifyIcon from '../../svgs/spotify-logo-icon';
import ArchiveIcon from '../../svgs/ia-logo-white-icon';
import BookletIcon from '../../svgs/icon-booklet';
import { HorizontalRadioGroup, TheatreAudioPlayer, TheatreTrackList } from '../../../index';

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

  /**
   * Callback every time user selects a channel
   */
  onChannelSelect(event) {
    const { albumData, channelToPlay: currentSource } = this.state;
    const newSource = event.target.value;

    if (currentSource === newSource) return;

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
      albumData, channelToPlay, trackSelected, tracklistToShow, trackStartingPoint
    } = this.state;
    const isAlbum = trackSelected === 0;

    let audioSource;

    if (channelToPlay === 'archive') {
      const index = isAlbum ? null : trackSelected;
      audioSource = { index };
      return audioSource;
    }

    // it's youtube or spotify
    const { albumSpotifyYoutubeInfo } = albumData;
    const albumSource = albumSpotifyYoutubeInfo[channelToPlay] || null;
    if (isAlbum && albumSpotifyYoutubeInfo.hasOwnProperty(channelToPlay)) {
      audioSource = {
        trackNumber: 0,
        [channelToPlay]: albumSource,
      };
      return audioSource;
    }
    const playerLoadingOnCertainTrack = trackSelected === null && trackStartingPoint !== null;
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
    if (Number.isInteger(audioSource.index)) {
      // has available track number to refer to, archive player
      return audioSource.index;
    }
    if (Number.isInteger(audioSource.trackNumber)) {
      // has available track number to refer to, third party
      return audioSource.trackNumber;
    }
    if (Number.isInteger(trackStartingPoint) && (trackSelected === null)) {
      return trackStartingPoint;
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
      trackSelected: Number.isInteger(selectedTrackNumber)
        ? selectedTrackNumber
        : 1
    }, this.updateURL);
  }

  /**
   * Callback every time JWPlayer plays a track
   * @param { object } playlistItem - JWPlayer track object
   */
  jwplayerPlaylistChange(playlistItem) {
    const { newTrackIndex } = playlistItem;
    this.setState({ trackSelected: newTrackIndex + 1 });
  }

  /**
   * Callback to Save URL Setter function that comes back from Play8 instantiation
   */
  receiveURLSetter(urlSetterFN) {
    this.setState({ urlSetterFN });
  }

  /**
   * Callback when JWPlayer loads for the first time & it starts on a different track
   * @param { index } JWPlayer track index
   */
  jwplayerStartingPoint(index) {
    this.setState({ trackStartingPoint: index + 1 });
  }
  /* END CALLBACKS */

  render() {
    const { jwplayerPlaylist, linerNotes } = this.props;
    const { tracklistToShow, channelToPlay, albumData } = this.state;
    const {
      albumMetadaToDisplay,
      externalSources = [],
      itemPhoto,
      externalSourcesDisplayValues,
      playSamples,
      creator: origCreator = []
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
    const displayChannelSelector = !!externalSources.length; // make it actual boolean so it won't display
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
        <section className="media-section">
          <TheatreAudioPlayer
            source={channelToPlay}
            backgroundPhoto={itemPhoto}
            sourceData={audioSource}
            customSourceLabels={contentBoxTabs}
            linerNotes={linerNotes}
            jwplayerPlaylistChange={this.jwplayerPlaylistChange}
            jwplayerStartingPoint={this.jwplayerStartingPoint}
            youtubePlaylistChange={this.youtubePlaylistChange}
            jwplayerInfo={jwplayerInfo}
            jwplayerID={`jwplayer-${jwplayerID}`}
            onRegistrationComplete={this.receiveURLSetter}
            playlist={tracklistToShow}
          />
        </section>
        <div className="grid-right">
          {
          displayChannelSelector
          && (
          <section className="channel-controls">
            <h4 className="title">Play from: </h4>
            <HorizontalRadioGroup
              options={this.getSelectableChannels()}
              onChange={this.onChannelSelect}
              name="audio-source"
              selectedValue={channelToPlay}
              wrapperStyle="rounded"
              dataEventCategory="Audio-Player"
            />
          </section>
          )
        }
          <section className="playlist-section">
            <TheatreTrackList
              tracks={tracklistToShow}
              onSelected={this.selectThisTrack}
              selectedTrack={trackToHighlight} // trackStartingPoint
              albumName={title}
              displayTrackNumbers={isArchiveChannel}
              creator={origCreator || creator}
              dataEventCategory="Audio-Player"
            />
          </section>
        </div>
      </div>
    );
  }
}

AudioPlayerWithYoutubeSpotify.defaultProps = {
  jwplayerPlaylist: null,
  playFullIAAudio: false,
  linerNotes: null,
};

AudioPlayerWithYoutubeSpotify.propTypes = {
  albumMetadata: PropTypes.object.isRequired,
  jwplayerPlaylist: PropTypes.array,
  playFullIAAudio: PropTypes.bool,
  linerNotes: PropTypes.object,
};

export default AudioPlayerWithYoutubeSpotify;
