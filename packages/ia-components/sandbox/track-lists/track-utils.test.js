import { formatTrackArtist, formatTrackTitle } from './track-utils';

describe('track utils', () => {
  describe('knows how to format a track title', () => {
    test('will return track title if available', () => {
      const trackTitle = 'Such a good name for a track';
      const fileName = 'such_a_good_name_for_a_track.mp3';
      const displayTrack = formatTrackTitle(trackTitle, fileName);
      expect(displayTrack).toEqual(trackTitle);
    });
    test('will return file name without extension if track title is not available', () => {
      const trackTitle = '';
      const fileName = 'such_a_good_name_for_a_track.mp3';
      const displayTrack = formatTrackTitle(trackTitle, fileName);
      expect(fileName).toContain(displayTrack);
    });
  });
  describe('knows when to display a track artist', () => {
    test('Do not show when track artist when it matches album artist', () => {
      const albumArtist = 'foo';
      const trackArtist = 'foo';
      const albumTitle = 'beep boop';
      const displayTrackArtist = formatTrackArtist(trackArtist, albumArtist, albumTitle);

      expect(displayTrackArtist).toBeFalsy();
    });
    test('Do not show track artist when it is a "Best of <artist>" album', () => {
      const albumArtist = 'fie fie fo fum, englishman';
      const trackArtist = 'fie fie fo fum';
      const albumTitle = 'best of fie fie fo fum';
      const displayTrackArtist = formatTrackArtist(trackArtist, albumArtist, albumTitle);

      expect(displayTrackArtist).toBeFalsy();
    });
    test('Show artist if album is a compilation', () => {
      const albumArtist = ['Various Artists', 'Scrapy Doo', 'Scooby Doo', 'Meddling Kids'];
      const trackArtist = 'Scrappy Doo; Meddling Kids';
      const albumTitle = 'Cherche la ghost';
      const displayTrackArtist = formatTrackArtist(trackArtist, albumArtist, albumTitle);

      expect(displayTrackArtist).toBeTruthy();
    });
    test('Artist string is formatted - delimited with `;\s`', () => {
      const albumArtist = ['Various Artists', 'Scrapy Doo', 'Scooby Doo', 'Meddling Kids'];
      const trackArtist = 'Scrappy Doo;Meddling Kids';
      const albumTitle = 'Cherche la ghost';
      const displayTrackArtist = formatTrackArtist(trackArtist, albumArtist, albumTitle);

      expect(displayTrackArtist).toBeTruthy();
      expect(displayTrackArtist).toEqual(trackArtist.split(';').join('; '));
    });
    test('defaults to showing track artists', () => {
      const albumArtist = ['Gem', 'Holograms', 'Misfits'];
      const trackArtist = 'Misfits';
      const albumTitle = 'Fashion & Fame';
      const displayTrackArtist = formatTrackArtist(trackArtist, albumArtist, albumTitle);

      expect(displayTrackArtist).toBeTruthy();
    });
  });
});
