import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import type {
  IAUserListSettings,
  UserListModel,
} from '../src/ia-user-list-settings';
import '../src/ia-user-list-settings';

describe('IAUserListSettings', () => {
  it('has defined fields rendered', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<iaux-userlist-settings></iaux-userlist-settings>`,
    );

    const newListElement = el.shadowRoot?.querySelector('.new-list');
    const listId = newListElement?.querySelector('#id');
    const listName = newListElement?.querySelector('#name');
    const listDesc = newListElement?.querySelector('#description');
    const listPrivate = newListElement?.querySelector('#private');

    expect(newListElement).exist;
    expect(listId).exist;
    expect(listName).exist;
    expect(listDesc).exist;
    expect(listPrivate).exist;
  });

  it('has button rendered', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<iaux-userlist-settings></iaux-userlist-settings>`,
    );

    const modalFooterElement = el.shadowRoot?.querySelector('.footer');
    const cancelButton = modalFooterElement?.querySelector('.ia-button.dark');
    const saveButton = modalFooterElement?.querySelector('.ia-button.primary');
    expect(cancelButton).exist;
    expect(saveButton).exist;
  });

  it('by default fields are empty/undefined', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<iaux-userlist-settings></iaux-userlist-settings>`,
    );

    const newListElement = el.shadowRoot?.querySelector('.new-list');

    const listId = newListElement?.querySelector('#id') as HTMLInputElement;
    const listName = newListElement?.querySelector('#name') as HTMLInputElement;
    const listDesc = newListElement?.querySelector(
      '#description',
    ) as HTMLInputElement;
    const listPrivate = newListElement?.querySelector(
      '#private',
    ) as HTMLInputElement;

    expect(listId?.value).to.equal('');
    expect(listName?.value).to.equal('');
    expect(listDesc?.value).to.equal('');
    expect(listPrivate?.checked).to.be.false;
  });

  it('fields should have data while edit', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<iaux-userlist-settings></iaux-userlist-settings>`,
    );

    const userList: UserListModel = {
      id: 'initial-list-id',
      list_name: 'my first list',
      description: 'my first list description',
      is_private: true,
    };

    el.userList = userList;

    await el.updateComplete;

    const newListElement = el.shadowRoot?.querySelector('.new-list');
    const listId = newListElement?.querySelector('#id') as HTMLInputElement;
    const listName = newListElement?.querySelector('#name') as HTMLInputElement;
    const listDesc = newListElement?.querySelector(
      '#description',
    ) as HTMLInputElement;
    const listPrivate = newListElement?.querySelector(
      '#private',
    ) as HTMLInputElement;

    expect(listId.value).to.equal(userList.id);
    expect(listName.value).to.equal(userList.list_name);
    expect(listDesc.value).to.equal(userList.description);
    expect(listPrivate.checked).to.be.true;
    /**
     * The log below shows the value attribute of id="id"
     * but not of the name and discription input fields
     * using property expression .value=${...}
     * But the value attribute is set correctly and tests pass.
     */
    // console.log(newListElement);
  });

  it('emit setting modal close event', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<iaux-userlist-settings></iaux-userlist-settings>`,
    );

    const cancelButton = el.shadowRoot?.querySelector(
      '#cancel',
    ) as HTMLInputElement;

    // Define a custom event name
    const customEventName = 'listModalClosed';

    // Listen for the custom event on the custom element
    let customEventFired = false;
    el.addEventListener(customEventName, () => {
      customEventFired = true;
    });

    // Use oneEvent to listen for the custom event
    const customEvent = oneEvent(el, customEventName);
    cancelButton?.click();

    // Wait for the custom event to be dispatched and captured
    const event = await customEvent;

    expect(customEventFired).to.be.true;
    expect(event.type).to.equal(customEventName);
    expect(event.target).to.equal(el);
  });
});
