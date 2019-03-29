import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { find, flatten } from 'lodash';

import flattenAlbumData from './utils/ia-metadata-utils';
import getTrackListBySource from './utils/get-track-list-by-source';

import YoutubeIcon from '../components/svgs/youtube-logo-icon';
import SpotifyIcon from '../components/svgs/spotify-logo-icon';
import ArchiveIcon from '../components/svgs/ia-logo-white-icon';
import { HorizontalRadioGroup, TheatreAudioPlayer, TheatreTrackList } from '../../../index';

/**
 * Create the channel label to display in channel selector
 * @param { string } channel
 * @param { string } labelValue
 */
const getChannelLabelToDisplay = ({ channel, labelValue }) => {
  const label = <span className="channel-label">{ labelValue }</span>;
  const iconOptions = {
    youtube: <YoutubeIcon className="channel-icon" />,
    spotify: <SpotifyIcon className="channel-icon" />,
    default: <ArchiveIcon className="channel-icon" />
  };
  const icon = iconOptions[channel] || iconOptions.default;

  return (
    <Fragment>
      {icon}
      {label}
    </Fragment>
  );
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
      trackSelected: 1, /* 0 = album */
    };

    this.selectThisTrack = this.selectThisTrack.bind(this);
    this.onChannelSelect = this.onChannelSelect.bind(this);
    this.jwplayerPlaylistChange = this.jwplayerPlaylistChange.bind(this);
    this.getSelectableChannels = this.getSelectableChannels.bind(this);
    this.getAudioSourceInfoToPlay = this.getAudioSourceInfoToPlay.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { albumData } = state;
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
    const { albumData, channelToPlay: currentSource, trackSelected: currentTrack } = this.state;
    const { albumSpotifyYoutubeInfo } = albumData;
    const newSource = event.target.value;

    if (currentSource === newSource) return;

    // if source has changed, then update source state & tracklisting
    const tracklistToShow = getTrackListBySource(albumData, newSource);
    const channelToPlay = newSource;

    // IF new source doesn't have album or item, reset trackList to null
    const newSourceAlbumInfo = albumSpotifyYoutubeInfo[newSource];
    const noAlbumWithNewSource = currentTrack === 0 && !newSourceAlbumInfo;
    const noTrackWithNewSource = !tracklistToShow.find(f => currentTrack === f.trackNumber);
    const trackSelected = (noAlbumWithNewSource || noTrackWithNewSource) ? null : currentTrack;

    const newState = { channelToPlay, tracklistToShow, trackSelected };
    this.setState(newState);
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
   * Callback every time user selects a track from the tracklist
   * @param { object } event - React synthetic event
   */
  selectThisTrack(event) {
    const selected = event.currentTarget;
    const selectedTrackNumber = parseInt(selected.getAttribute('data-track-number'), 10);

    this.setState({
      trackSelected: Number.isInteger(selectedTrackNumber)
        ? selectedTrackNumber
        : null
    });
  }

  /**
   * Find the right audio metadata depending on the channel and track number
   */
  getAudioSourceInfoToPlay() {
    const {
      albumData, channelToPlay, trackSelected, tracklistToShow
    } = this.state;
    if (trackSelected === null) return {};

    const isAlbum = trackSelected === 0;
    let audioSource = null;

    if (channelToPlay !== 'archive') {
      // it's youtube or spotify
      const { albumSpotifyYoutubeInfo } = albumData;
      const albumSource = albumSpotifyYoutubeInfo[channelToPlay] || null;
      if (isAlbum) {
        audioSource = {};
        audioSource[channelToPlay] = albumSource;
      }

      if (!audioSource) {
        audioSource = find(tracklistToShow, track => track.trackNumber === trackSelected);
      }

      return audioSource;
    }

    // ia jw player only needs index
    audioSource = {
      index: trackSelected - 1 || 0
    };

    return audioSource;
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
            alt="show webamp"
            className="webamp-link"
            data-event-click-tracking="Audio-Player|Channel-Webamp"
          >
            <img src="/images/llama-icon.png" alt="webamp-logo" />
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
        label: getChannelLabelToDisplay({ channel, labelValue }),
        clickTrackValue: `Audio-Player|Channel-${labelValue}`,
      };
    });

    return channelOptions;
  }

  render() {
    const { jwplayerPlaylist } = this.props;
    const {
      tracklistToShow, trackSelected, channelToPlay, albumData
    } = this.state;
    const {
      title, itemPhoto, playSamples, externalSources = [], identifier, collection, externalSourcesDisplayValues, creator
    } = albumData;
    let audioPlayerChannelLabel;
    const isArchiveChannel = channelToPlay === 'archive';
    if (isArchiveChannel) {
      audioPlayerChannelLabel = `${playSamples ? ' Samples' : 'Internet Archive'}`;
    } else {
      audioPlayerChannelLabel = externalSourcesDisplayValues[channelToPlay] || '';
    }
    const jwplayerInfo = {
      jwplayerPlaylist,
      identifier: identifier[0],
      collection: collection[0]
    };
    const jwplayerID = identifier[0].replace(/[^a-zA-Z\d]/g, '');
    const displayChannelSelector = !!externalSources.length; // make it actual boolean so it won't display
    return (
      <div className="theatre__wrap audio-with-youtube-spotify">
        <section className="media-section">
          <TheatreAudioPlayer
            source={channelToPlay}
            backgroundPhoto={itemPhoto}
            sourceData={this.getAudioSourceInfoToPlay()}
            customSourceLabel={getChannelLabelToDisplay({ channel: channelToPlay, labelValue: audioPlayerChannelLabel })}
            linerNotes={null}
            jwplayerPlaylistChange={this.jwplayerPlaylistChange}
            jwplayerInfo={jwplayerInfo}
            jwplayerID={`jwplayer-${jwplayerID}`}
          />
        </section>
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
            selectedTrack={trackSelected}
            albumName={title[0]}
            displayTrackNumbers={isArchiveChannel}
            creator={creator[0]}
            dataEventCategory="Audio-Player"
          />
        </section>
      </div>
    );
  }
}

AudioPlayerWithYoutubeSpotify.defaultProps = {
  jwplayerPlaylist: null,
  playFullIAAudio: false
};

AudioPlayerWithYoutubeSpotify.propTypes = {
  albumMetadata: PropTypes.object.isRequired,
  jwplayerPlaylist: PropTypes.array,
  playFullIAAudio: PropTypes.bool
};

export default AudioPlayerWithYoutubeSpotify;
