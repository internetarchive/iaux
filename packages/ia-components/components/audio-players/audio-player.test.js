import React from 'react';
import TestRenderer from 'react-test-renderer';

import TheatreAudioPlayer from './audio-player-main';


/**
 * Test for TheatreAudioPlayer
 */
describe('TheatreAudioPlayer ', () => {
  const externalProps = {
    jwplayerInfo: {
      jwplayerPlaylist: [],
      identifier: 'boop'
    },
    name: 'testing-audio-player'
  };
  const component = TestRenderer.create(
    <TheatreAudioPlayer
      source="spotify"
      sourceData={{
        urlPrefix: 'https://embed.spotify.com/?uri=',
        id: 'spotify:album:647o8vl4OD1sjvvhql3jFS'
      }}
      customSourceLabels={{ player: 'Spotify' }}
      playlist={[]}
      {...externalProps}
    />
  );
  const tree = component.toJSON();
  const testInstance = component.root;
  test('has main sections: content window, tabs', () => {
    expect(tree).toMatchSnapshot();
    expect(tree.children.length).toEqual(2);
    expect(tree.children[0].props.className).toContain('content-window');
    expect(tree.children[1].props.className).toContain('tabs');
  });
  test('shows iframe when referencing third party', () => {
    const iframe = testInstance.findAllByType('iframe');
    expect(iframe.length).toEqual(1);
  });
  test('content window has 2 children', () => {
    const { props } = testInstance;
    const { backgroundPhoto } = props;

    expect(backgroundPhoto).toBeFalsy();
    const contentWindow = tree.children[0];
    expect(contentWindow.children.length).toEqual(2);
  });
  test('shows media icon when there is no background photo', () => {
    const { props } = testInstance;
    const { backgroundPhoto } = props;

    expect(backgroundPhoto).toBeFalsy();
    const contentWindow = tree.children[0];
    const backgroundPhotoPlaceholder = contentWindow.children[0];
    const image = backgroundPhotoPlaceholder.children[0];
    expect(image.props.className).toContain('no-photo');
  });
  test('shows waveform via jwplayer when no background photo', () => {
    const { props } = testInstance;
    const { backgroundPhoto } = props;

    expect(backgroundPhoto).toBeFalsy();
    const contentWindow = tree.children[0];
    const jwplayerContainer = contentWindow.children[1];
    expect(jwplayerContainer.props.className).toContain('with-waveform');
  });
});
