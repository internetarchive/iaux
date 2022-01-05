import React, { Component } from 'react';
import axios from 'axios';
import albumData from '../../data-for-stories/album-78-w-one-image';

// import albumData from '../../data-for-stories/album-private-with-spotify-youtube';
import AudioPlayerWithYoutubeSpotify from './audio-with-youtube-spotify-main';
import './audio-with-youtube-spotify.less';

const { itemInfo, jwplayerPlaylist, linerNotes } = albumData;

const items = [
  {
    id: 'capitol-15045-b-cigarettes-whiskey-and-wild-wild-women',
    desc: '78 - w/o jp2 (only 1 item image)'
  },
  {
    id: 'bestofdollyparto00part',
    desc: 'LP - older'
  },
  {
    id: 'lp_dancing-tonight_freddy-martin-and-his-orchestra',
    desc: 'LP - current, ~ 2020'
  },
  {
    id: 'cd_beethoven-complete-works-for-string-trio_the-adaskin-string-trio',
    desc: 'what_cd'
  },
  {
    id: 'wcd_message-in-a-box-th_the-police_flac_lossless_807968',
    desc: 'Irregular Photo - (portrait)'
  },
  {
    id: 'lak-JC_Burris-James_Booker',
    desc: 'No photo + long track list'
  },
  {
    id: 'wcd_various-artiststhe-best-of-country-music_flac_lossless_29887623',
    desc: 'Complilation, various artists'
  },
  {
    id: 'lp_emperor-concerto_ludwig-van-beethoven-arthur-rubinstein-bos',
    desc: 'Track names, multiple but same as album artist (should be omitted)'
  },
  {
    id: 'illegal-art',
    desc: '3 column track list wide view pagination check'
  },
  {
    id: 'wcd_borghild_die-warzau_mp3_320_1648819',
    desc: 'Track time display, 60 seconds adds another minute. should display as 10:00'
  },
  {
    id: 'cd_aaliyah_aaliyah-static-from-playa-timbaland',
    desc: 'Has 3rd party "Full Album". Clicking on Full Album should highlight full album'
  },
];

/**
 * Component wrapper around the music player
 * The intent is for quick debugging with the music player
 * while using actual production data
 */
class DataHydrator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfo,
      jwplayerPlaylist,
      error: ''
    };

    this.input = React.createRef();
    this.fetchData = this.fetchData.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  getItem(event) {
    event.preventDefault();
    event.stopPropagation();
    const button = event.target;
    const identifier = button.getAttribute('data-identifier');
    this.fetchData(identifier);
  }

  updateItem(event) {
    event.preventDefault();
    event.stopPropagation();
    const identifier = this.input.current.value;

    this.fetchData(identifier);
  }

  fetchData(identifier) {
    const detailsJSONPath = `/api/metadata/${identifier}`;
    const jwplayerPlaylistJSONPath = `/api/embed/${identifier}?output=json`;
    const base = axios.create({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': '*',
        Accept: 'application/json',
      }
    });
    const sendState = function setJWPlayerPlaylist(response) {
      console.log('embed ', response);
      this.setState({
        jwplayerPlaylist: response.data
      });
    }.bind(this);

    base.get(detailsJSONPath)
      .then((response) => {
        console.log('details ', response);
        this.setState({
          itemInfo: response.data
        });
      })
      .catch((error) => {
        console.log('DETAILS FETCH ERROR: ', error);
        this.setState({ error });
      })
      .then(() => {
        base.get(jwplayerPlaylistJSONPath)
          .then(sendState)
          .catch((error) => {
            console.log('EMBED FETCH ERROR: ', error);
            this.setState({ error });
          });
      });
  }

  render() {
    const { itemInfo, jwplayerPlaylist, error } = this.state;
    const { metadata: { identifier } } = itemInfo;

    console.log('***** RENDER: ', { itemInfo, error, jwplayerPlaylist });
    // using bootstrap v3 styling for container for pretty UI
    return (
      <div>
        <section style={{ backgroundColor: 'black' }}>
          <AudioPlayerWithYoutubeSpotify
            albumMetadata={itemInfo}
            jwplayerPlaylist={jwplayerPlaylist}
            linerNotes={linerNotes}
          />
        </section>
        <section className="container">
          <h2>{`Identifier: ${identifier}`}</h2>
          <form className="form-group">
            <label>
              <span className="form-text">Identifier: </span>
              <input
                type="text"
                ref={this.input}
                className="form-control"
              />
            </label>
            <button type="button" className="btn btn-primary" onClick={this.updateItem}>Update Player</button>
          </form>
        </section>
        <section className="container">
          <h3>Supported Items</h3>
          <h4>Archive </h4>
          <div id="liner-notes-list">
            <table id="examples">
              <thead>
                <tr>
                  <th scope="col">item actions</th>
                  <th scope="col">ID</th>
                  <th scope="col">it's quirks</th>
                </tr>
              </thead>
              <tbody>
                {
                items.map((item) => {
                  const { id, desc } = item;
                  return (
                    <tr>
                      <td>
                        <button
                          type="button"
                          className="btn btn-info"
                          data-identifier={id}
                          onClick={this.getItem}
                        >
                          Show
                        </button>
                        <a className="btn btn-link" target="_blank" href="https://archive.org/metadata/${id}">Metadata</a>
                        <a className="btn btn-link" target="_blank" href="https://archive.org/details/${id}">Details</a>
                      </td>
                      <td>
                        {id}
                      </td>
                      <td>
                        {desc}
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>

        </section>
      </div>
    );
  }
}


export default {
  title: 'Theaters',
  component: AudioPlayerWithYoutubeSpotify,
};

export const AudioWithLinerNotes = () => <DataHydrator />;
