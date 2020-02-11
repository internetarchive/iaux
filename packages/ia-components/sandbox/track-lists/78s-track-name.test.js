/* eslint no-unused-vars: 0  */ // bc of array destructure
import React from 'react';
import TestRenderer from 'react-test-renderer';

import trackFor78s from './test-utils/78rpm-track';
import OneTrack from './track';

const { regularTrack, noTrackName } = trackFor78s;

describe('78rpm item track name display', () => {
  const component = TestRenderer.create(
    <OneTrack
      onSelected={() => {}}
      displayTrackNumber={false}
      selected={false}
      thisTrack={regularTrack}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const { trackNumber, formattedLength } = regularTrack;

  describe('has basic info', () => {
    const [trNum, trackTitle, trackLength] = tree.children;

    test('has track number', () => {
      expect(parseInt(trNum.children.join(''), 10)).toEqual(trackNumber);
    });
    test('has track length', () => {
      expect(trackLength.children.join('')).toEqual(formattedLength);
    });
    test('has track title', () => {
      expect(trackTitle.props.className).toEqual('track-title');
    });
  });

  // does not display artist's name if it is in the title
  // an artist's name in the title signals that they are the album artist
  describe('When to show artist name[s]', () => {
    test('Do not show artist name if their name is in the title', () => {
      const { album, title, creator } = regularTrack;
      const noArtist1 = TestRenderer.create(
        <OneTrack
          onSelected={() => {}}
          displayTrackNumber={false}
          selected={false}
          thisTrack={regularTrack}
          albumName={`${creator} has an amazing album`}
        />
      ).toJSON();
      const [trackName, trackTitle, trackLength] = noArtist1.children;
      const [actualTrackTitle, delimiter, artistElement] = trackTitle.children;

      expect(actualTrackTitle).toEqual(title);
      expect(delimiter).toEqual(undefined);
      expect(artistElement).toEqual(undefined);
    });

    test('Do not show artist if they exactly match the album artist', () => {
      const { album, title, creator } = regularTrack;
      const noArtist2 = TestRenderer.create(
        <OneTrack
          onSelected={() => {}}
          displayTrackNumber={false}
          selected
          thisTrack={regularTrack}
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

  describe('Knows how to display track name', () => {
    test('uses file name if no title', () => {
      const { name, title, creator } = noTrackName;
      const noArtist2 = TestRenderer.create(
        <OneTrack
          onSelected={() => {}}
          displayTrackNumber={false}
          selected
          thisTrack={noTrackName}
          albumCreator={creator}
        />
      ).toJSON();
      const [trackNumber, trackTitle, trackLength] = noArtist2.children;
      const [actualTrackTitle, delimiter, artistElement] = trackTitle.children;

      expect(name).toContain(actualTrackTitle);
    });
  });
});
