import { AudioSource } from '@internetarchive/audio-element';

/**
 * A data model to configure the Radio Player.
 *
 * @export
 * @class RadioPlayerConfig
 */
export default class RadioPlayerConfig {
  title: string;

  date: string;

  logoUrl: string;

  waveformUrl: string;

  audioSources: AudioSource[];

  quickSearches: string[] = [];

  /**
   * Creates an instance of RadioPlayerConfig.
   * @param {string} title
   * @param {string} date
   * @param {string} logoUrl
   * @param {string} waveformUrl
   * @param {AudioSource[]} audioSources
   * @param {string[]} [quickSearches=[]]
   * @memberof RadioPlayerConfig
   */
  constructor(
    title: string,
    date: string,
    logoUrl: string,
    waveformUrl: string,
    audioSources: AudioSource[],
    quickSearches: string[] = [],
  ) {
    this.title = title;
    this.date = date;
    this.logoUrl = logoUrl;
    this.waveformUrl = waveformUrl;
    this.audioSources = audioSources;
    this.quickSearches = quickSearches;
  }
}
