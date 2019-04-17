import React from 'react';
import TestRenderer from 'react-test-renderer';

import TheatreTrackList from './track-list';

const tracks = [
  {
    source: 'derivative',
    creator: 'Willie Nelson',
    title: 'Night Life',
    track: '1',
    album: 'The Essential Willie Nelson',
    bitrate: '108',
    length: '00:30',
    format: 'MP3 Sample',
    original: 'disc1/01.01. Willie Nelson - Night Life.flac',
    mtime: '1510662255',
    size: '514560',
    md5: '6beff838f9805e0e53d661cdc7f58325',
    crc32: '447db8a5',
    sha1: 'ac10d01321a3aba6d359657b7a849b01735769e8',
    height: '0',
    width: '0',
    name: 'disc1/01.01. Willie Nelson - Night Life_sample.mp3',
    fullFilePath: 'https://ia600103.us.archive.org/16/items/cd_the-essential-willie-nelson_willie-nelson-aerosmith-emmylou-harris-jul/disc1%2F01.01.%20Willie%20Nelson%20-%20Night%20Life_sample.mp3',
    trackNumber: 1
  }
];

/**
 * Test for TheatreTrackList
 */
describe('TheatreTrackList ', () => {
  describe('handles no tracks', () => {
    test('displays message', () => {
      const component = TestRenderer.create(
        <TheatreTrackList
          onSelected={() => {}}
        />
      );
      const tree = component.toJSON();
      const testInstance = component.root;

      expect(tree).toMatchSnapshot();
      expect(tree.props.className).toEqual('no-tracks');
    });
  });

  describe('can toggle display of track numbers', () => {
    test('signals when `displayTrackNumbers` is turned off', () => {
      const component = TestRenderer.create(
        <TheatreTrackList
          onSelected={() => {}}
          displayTrackNumbers={false}
          creator="Willie Nelson"
          tracks={tracks}
        />
      );
      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
      const paginator = tree.children[0];
      expect(paginator.children.length).toEqual(1);
      const trackItem = paginator.children[0];
      expect(trackItem.props.className).toContain('no-track-number');
    });
  });

  describe('Track title does not display album creator', () => {
    const component = TestRenderer.create(
      <TheatreTrackList
        onSelected={() => {}}
        displayTrackNumbers={false}
        creator="Willie Nelson"
        tracks={tracks}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    const paginator = tree.children[0];
    expect(paginator.children.length).toEqual(1);
    const trackItem = paginator.children[0];
    expect(trackItem.children.length).toEqual(3);

    const trackTitleSection = trackItem.children[1];
    expect(trackTitleSection.children).toContain('Night Life');
  });

  describe('sends onSelected callback', () => {
    let callbackCalled = false;
    const callback = () => {
      callbackCalled = true;
    };
    const component = TestRenderer.create(
      <TheatreTrackList
        onSelected={callback}
        displayTrackNumbers={false}
        creator="Willie Nelson"
        tracks={tracks}
      />
    );
    const testInstance = component.getInstance();
    testInstance.props.onSelected();
    expect(callbackCalled).toEqual(true);
  });
});
