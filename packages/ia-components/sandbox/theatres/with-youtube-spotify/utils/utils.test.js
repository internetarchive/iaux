import { isValidAudioFile, isValidImageFile } from './utils';

describe('Music Player Util - General', () => {
  describe('Returns true when correct music file extension is valid', () => {
    test('non-whitelisted extension', () => {
      expect(isValidAudioFile('track-title.doc')).toBe(false);
    });
    test('.mp3', () => {
      expect(isValidAudioFile('track-title.mp3')).toBe(true);
    });
    test('.ogg', () => {
      expect(isValidAudioFile('track-title.ogg')).toBe(true);
    });
    test('.flac', () => {
      expect(isValidAudioFile('track-title.flac')).toBe(true);
    });
    test('.m4a', () => {
      expect(isValidAudioFile('track-title.m4a')).toBe(true);
    });
    test('.wma', () => {
      expect(isValidAudioFile('track-title.wma')).toBe(true);
    });
    test('.aiff', () => {
      expect(isValidAudioFile('track-title.aiff')).toBe(true);
    });
    test('.aac', () => {
      expect(isValidAudioFile('track-title.aac')).toBe(true);
    });
    test('.aa', () => {
      expect(isValidAudioFile('track-title.aa')).toBe(true);
    });
    test('.ra', () => {
      expect(isValidAudioFile('track-title.ra')).toBe(true);
    });
    test('.ram', () => {
      expect(isValidAudioFile('track-title.ram')).toBe(true);
    });
    test('.shn', () => {
      expect(isValidAudioFile('track-title.shn')).toBe(true);
    });
    test('.wav', () => {
      expect(isValidAudioFile('track-title.wav')).toBe(true);
    });
    test('.wave', () => {
      expect(isValidAudioFile('track-title.wave')).toBe(true);
    });
  });
  describe('Returns true when correct image file extension is valid', () => {
    test('non-whitelisted extension', () => {
      expect(isValidAudioFile('image-title.doc')).toBe(false);
    });
    test('.png', () => {
      expect(isValidImageFile('image-title.png')).toBe(true);
    });
    test('.jpg', () => {
      expect(isValidImageFile('image-title.jpg')).toBe(true);
    });
    test('.jpeg', () => {
      expect(isValidImageFile('image-title.jpeg')).toBe(true);
    });
  });
});
