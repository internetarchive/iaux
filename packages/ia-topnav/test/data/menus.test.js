import { expect } from '@open-wc/testing';
import * as menus from '../../src/data/menus';

describe('Menu data', () => {
  it('returns a collection for each media category', () => {
    [
      'texts',
      'video',
      'audio',
      'software',
      'images',
      'user',
      'more',
    ].forEach((category) => {
      expect(menus[category]('archive.org')).to.not.be.undefined;
    });
  });

  it('uses prodHost as a default', () => {
    [
      'texts',
      'video',
      'audio',
      'software',
      'images',
      'more',
    ].forEach((category) => {
      expect(menus[category]()).to.not.be.undefined;
    });
  });
});
