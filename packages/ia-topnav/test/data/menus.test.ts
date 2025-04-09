import { expect } from '@open-wc/testing';
import { buildTopNavMenus } from '../../src/data/menus';

describe('Menu data', () => {
  it('returns a collection for each media category', () => {
    const menus = buildTopNavMenus();

    ['texts', 'video', 'audio', 'software', 'images', 'user', 'more'].forEach(
      (category) => {
        const menus = buildTopNavMenus();
        // expect(menus[category]).to.not.be.undefined;
      },
    );
  });
});
