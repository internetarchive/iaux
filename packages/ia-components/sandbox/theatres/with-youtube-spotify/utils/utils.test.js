import {
  isValidAudioFile, isValidImageFile, isOlderDerivedMP3, isValidSegmentFile
} from './utils';

describe('Music Player Util - General', () => {
  describe('Returns true when filename has the correct AUDIO extension', () => {
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
  describe('Returns true when filename has a valid IMAGE extension', () => {
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
  describe('Returns true when filename has the OLDER derived MP3 extension', () => {
    test('any mp3', () => {
      expect(isOlderDerivedMP3('track-title.mp3')).toBe(false);
    });
    test('older mp3', () => {
      expect(isOlderDerivedMP3('track-title_vbr.mp3')).toBe(true);
    });
    test('not an mp3', () => {
      expect(isOlderDerivedMP3('track-title.ogg')).toBe(false);
    });
  });
  describe('Returns true when filename has the correct SEGEMENT FILE extension ', () => {
    test('non-whitelisted extension', () => {
      expect(isValidSegmentFile('id-of-item_segments.doc')).toBe(false);
    });
    test('.json', () => {
      expect(isValidSegmentFile('id-of-item_segments.json')).toBe(true);
    });
    test('.xml', () => {
      expect(isValidSegmentFile('id-of-item_segments.xml')).toBe(true);
    });
  });
});
