import { html, fixture, expect } from '@open-wc/testing';
import '../src/user-menu';
import { user as userMenu } from '../src/data/menus';

const component = html`<user-menu></user-menu>`;

describe('<user-menu>', () => {
  it('does not render admin links for default users', async () => {
    const el = await fixture(component);
    el.menuItems = userMenu({});

    await el.updateComplete;

    expect(el.shadowRoot.querySelectorAll('li').length).to.be.gt(0);
    expect(el.shadowRoot.querySelectorAll('.divider').length).to.equal(0);
  });

  it('does not render admin links for privileged users when not viewing an item', async () => {
    const el = await fixture(component);
    el.config = {
      biblio: 'https://some-url.com',
      identifier: false,
      isAdmin: true,
      uploader: 'bar-uploader@baz.org',
    };
    el.menuItems = userMenu(el.config);

    await el.updateComplete;

    expect(el.shadowRoot.querySelectorAll('li').length).to.be.gt(0);
    expect(el.shadowRoot.querySelectorAll('.divider').length).to.equal(0);
  });

  it('renders admin links for privileged users when viewing an editable item', async () => {
    const el = await fixture(component);
    el.config = {
      biblio: 'https://some-url.com',
      identifier: 'foo',
      isAdmin: true,
      uploader: 'bar-uploader@baz.org',
    };
    el.menuItems = userMenu(el.config);

    await el.updateComplete;

    expect(el.shadowRoot.querySelectorAll('.divider').length).to.be.gt(0);
  });
});
