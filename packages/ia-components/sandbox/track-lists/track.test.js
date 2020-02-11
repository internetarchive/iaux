import React from 'react';
import TestRenderer from 'react-test-renderer';

import cdTracks from './test-utils/acdc-track';
import oneTrack from './track';

const { bestOfCompilation } = cdTracks;

describe('one track item', () => {
  describe('has defaults in place track', () => {
    const component = TestRenderer.create(
      oneTrack({
        onSelected: () => {},
        selected: false,
        thisTrack: bestOfCompilation
      })
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    test('has base classes', () => {
      const expectedDefaults = [
        expect.stringMatching(/track/),
        expect.stringMatching(/no-track-number/) // does not display track numbers as default
      ];
      const baseClasses = (tree.props.className).split(' ');
      expect(baseClasses).toEqual(
        expect.arrayContaining(expectedDefaults),
      );
    });
    test('knows which track it is in an album context', () => {
      expect(tree.props['data-track-number']).toBeTruthy();
    });
    test('has custom analytics property', () => {
      expect(tree.props['data-event-click-tracking']).toBeTruthy();
    });
    test('has click handler', () => {
      expect(tree.props.onClick).toBeTruthy();
    });
    test('knows it is not the selected track', () => {
      expect(tree.props.className).toEqual(expect.not.stringContaining('selected'));
    });

    describe('displays track number, title, and track length', () => {
      const [trackNumber, trackTitle, trackLength] = tree.children;

      test('has 3 children to display track info', () => {
        expect(tree.children.length).toEqual(3);
      });
      test('has track number', () => {
        expect(trackNumber.props.className).toEqual('track-number');
      });
      test('has track title', () => {
        expect(trackTitle.props.className).toEqual('track-title');
      });
      test('has track length', () => {
        expect(trackLength.props.className).toEqual('track-length');
      });
    });
  });
});
