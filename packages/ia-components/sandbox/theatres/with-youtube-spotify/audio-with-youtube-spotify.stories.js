import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import axios from 'axios';

import albumData from '../../data-for-stories/album-private-with-spotify-youtube';
import AudioPlayerWithYoutubeSpotify from './audio-with-youtube-spotify-main';
import style from './audio-with-youtube-spotify.less';
// import styles from '../../../.storybook/theatre-styling.less';

const { itemInfo, jwplayerPlaylist, linerNotes } = albumData;

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
      fetchComplete: false,
      error: ''
    };

    this.input = React.createRef();
    this.fetchData = this.fetchData.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  updateItem(event) {
    event.preventDefault();
    event.stopPropagation();
    const identifier = this.input.current.value;

    this.fetchData(identifier);
  }

  getItem(event) {
    event.preventDefault();
    event.stopPropagation();
    const button = event.target;
    const identifier = button.getAttribute('data-identifier');
    this.fetchData(identifier);
  }

  fetchData(identifier) {
    const detailsJSONPath = `/api/details/${identifier}?output=json`;
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
    const { itemInfo, jwplayerPlaylist } = this.state;
    const { metadata: { identifier } } = itemInfo;

    console.log('***** RENDER: ', itemInfo, jwplayerPlaylist.length);
    // using bootstrap v3 styling for container for pretty UI
    return (
      <div>
        <section>
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
            <button className="btn btn-primary" onClick={this.updateItem}>Update Player</button>
          </form>
        </section>
        <section className="container">
          <h3>Supported Items</h3>
          <h4>Archive </h4>
          <table>
            <thead>
              <th>Collection</th>
              <th>Identifier</th>
            </thead>
            <tbody>
              <tr>
                <td>album_recordings (Older LP)</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-lg btn-warning"
                    data-identifier="bestofdollyparto00part"
                    onClick={this.getItem}
                  >
                    bestofdollyparto00part
                  </button>
                </td>
              </tr>
              <tr>
                <td>album_recordings (Latest LP)</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-lg btn-info"
                    data-identifier="lp_dancing-tonight_freddy-martin-and-his-orchestra"
                    onClick={this.getItem}
                  >
                    lp_dancing-tonight_freddy-martin-and-his-orchestra
                  </button>
                </td>
              </tr>
              <tr>
                <td>what_cd</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-lg btn-success"
                    data-identifier="cd_beethoven-complete-works-for-string-trio_the-adaskin-string-trio"
                    onClick={this.getItem}
                  >
                    cd_beethoven-complete-works-for-string-trio_the-adaskin-string-trio
                  </button>
                </td>
              </tr>
              <tr>
                <td>what_cd (Irregular Photo)</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-lg btn-success"
                    data-identifier="wcd_message-in-a-box-th_the-police_flac_lossless_807968"
                    onClick={this.getItem}
                  >
                    wcd_message-in-a-box-th_the-police_flac_lossless_807968
                  </button>
                </td>
              </tr>
              <tr>
                <td>acdc (NO PHOTO)</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    data-identifier="lak-JC_Burris-James_Booker"
                    onClick={this.getItem}
                  >
                    lak-JC_Burris-James_Booker
                  </button>
                </td>
              </tr>
              <tr>
                <td>what CD compilation - all track artists names show</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    data-identifier="wcd_various-artiststhe-best-of-country-music_flac_lossless_29887623"
                    onClick={this.getItem}
                  >
                  wcd_various-artiststhe-best-of-country-music_flac_lossless_29887623
                  </button>
                </td>
              </tr>
              <tr>
                <td>Track names, multiple but same as album artist (should be omitted)</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    data-identifier="lp_emperor-concerto_ludwig-van-beethoven-arthur-rubinstein-bos"
                    onClick={this.getItem}
                  >
                  lp_emperor-concerto_ludwig-van-beethoven-arthur-rubinstein-bos
                  </button>
                </td>
              </tr>
              <tr>
                <td>3 column track list wide view pagination check</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    data-identifier="illegal-art"
                    onClick={this.getItem}
                  >
                  illegal-art
                  </button>
                </td>
              </tr>
              <tr>
                <td>Track time display, 60 seconds adds another minute. should display as 10:00</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    data-identifier="wcd_borghild_die-warzau_mp3_320_1648819"
                    onClick={this.getItem}
                  >
                  wcd_borghild_die-warzau_mp3_320_1648819
                  </button>
                </td>
              </tr>
              <tr>
                <td>Has 3rd party "Full Album". Clicking on Full Album should highlight full album</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    data-identifier="cd_aaliyah_aaliyah-static-from-playa-timbaland"
                    onClick={this.getItem}
                  >
                  cd_aaliyah_aaliyah-static-from-playa-timbaland
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

storiesOf('Theatres', module)
  .addWithJSX('Audio with YouTube, Spotify', () => (
    <DataHydrator />
  ));
