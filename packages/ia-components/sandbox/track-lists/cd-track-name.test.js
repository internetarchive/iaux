/* eslint no-unused-vars: 0  */ // bc of array destructure
import React from 'react';
import TestRenderer from 'react-test-renderer';

import cdTracks from './test-utils/acdc-track';
import OneTrack from './track';

const { bestOfCompilation } = cdTracks;

describe('ACDC item track name display', () => {
  const component = TestRenderer.create(
    <OneTrack
      onSelected={() => {}}
      displayTrackNumber={false}
      selected={false}
      thisTrack={bestOfCompilation}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const { track, length } = bestOfCompilation;

  describe('has basic info', () => {
    const [trackNumber, trackTitle, trackLength] = tree.children;

    test('has track number', () => {
      expect(trackNumber.children.join('')).toEqual(track);
    });
    test('has track length', () => {
      expect(trackLength.children.join('')).toEqual(length);
    });
    test('has track title', () => {
      expect(trackTitle.props.className).toEqual('track-title');
    });
  });

  // does not display artist's name if it is in the title
  // an artist's name in the title signals that they are the album artist
  describe('When to show artist name[s]', () => {
    test('Do not show artist name if their name is in the title', () => {
      const { album, title } = bestOfCompilation;
      const noArtist1 = TestRenderer.create(
        <OneTrack
          onSelected={() => {}}
          displayTrackNumber={false}
          selected={false}
          thisTrack={bestOfCompilation}
          albumName={album}
        />
      ).toJSON();
      const [trackName, trackTitle, trackLength] = noArtist1.children;
      const [actualTrackTitle, delimiter, artistElement] = trackTitle.children;
      expect(actualTrackTitle).toEqual(title);
      expect(delimiter).toEqual(undefined);
      expect(artistElement).toEqual(undefined);
    });

    test('Do not show artist if they exactly match the album artist', () => {
      const { album, title, creator } = bestOfCompilation;
      const noArtist2 = TestRenderer.create(
        <OneTrack
          onSelected={() => {}}
          displayTrackNumber={false}
          selected
          thisTrack={bestOfCompilation}
          albumCreator={creator}
        />
      ).toJSON();
      const [trackNumber, trackTitle, trackLength] = noArtist2.children;
      const [actualTrackTitle, delimiter, artistElement] = trackTitle.children;

      expect(actualTrackTitle).toEqual(title);
      expect(delimiter).toEqual(undefined);
      expect(artistElement).toEqual(undefined);
    });
  });
});
