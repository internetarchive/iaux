import trackUtils from './track-utils';

const { showTrackArtist } = trackUtils;

describe('track utils', () => {
  describe('knows when to display a track artist', () => {
    test('Do not show when track artist when it matches album artist', () => {
      const albumArtist = 'foo';
      const trackArtist = 'foo';
      const albumTitle = 'beep boop';
      const displayTrackArtist = showTrackArtist(trackArtist, albumArtist, albumTitle);

      expect(displayTrackArtist).toEqual(false);
    });
    test('Do not show track artist when it is a "Best of <artist>" album', () => {
      const albumArtist = 'fie fie fo fum, englishman';
      const trackArtist = 'fie fie fo fum';
      const albumTitle = 'best of fie fie fo fum';
      const displayTrackArtist = showTrackArtist(trackArtist, albumArtist, albumTitle);

      expect(displayTrackArtist).toEqual(false);
    });
    test('Show artist if album is a compilation', () => {
      const albumArtist = ['Various Artists', 'Scrapy Doo', 'Scooby Doo', 'Meddling Kids'];
      const trackArtist = 'Scrappy Doo; Meddling Kids';
      const albumTitle = 'Cherche la ghost';
      const displayTrackArtist = showTrackArtist(trackArtist, albumArtist, albumTitle);

      expect(displayTrackArtist).toEqual(true);
    });
    test('defaults to showing track artists', () => {
      const albumArtist = ['Gem', 'Holograms', 'Misfits'];
      const trackArtist = 'Misfits';
      const albumTitle = 'Fashion & Fame';
      const displayTrackArtist = showTrackArtist(trackArtist, albumArtist, albumTitle);

      expect(displayTrackArtist).toEqual(true);
    });
  });
});
