/* eslint-disable */

import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import type { IAUserListSettings } from '../src/ia-user-list-settings';
import '../src/ia-user-list-settings';

describe('IAUserListSettings', () => {
  it('has defined fields rendered', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<iaux-userlist-settings></iaux-userlist-settings>`
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
      html`<iaux-userlist-settings></iaux-userlist-settings>`
    );

    const modalFooterElement = el.shadowRoot?.querySelector('.footer');
    const cancelButton = modalFooterElement?.querySelector('.ia-button.dark');
    const saveButton = modalFooterElement?.querySelector('.ia-button.primary');
    expect(cancelButton).exist;
    expect(saveButton).exist;
  });

  it('by default fields are empty/undefined', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<iaux-userlist-settings></iaux-userlist-settings>`
    );

    const newListElement = el.shadowRoot?.querySelector('.new-list');

    const listId = newListElement?.querySelector('#id') as HTMLInputElement;
    const listName = newListElement?.querySelector('#name') as HTMLInputElement;
    const listDesc = newListElement?.querySelector(
      '#description'
    ) as HTMLInputElement;
    const listPrivate = newListElement?.querySelector(
      '#private'
    ) as HTMLInputElement;

    expect(listId?.value).to.equal('');
    expect(listName?.value).to.equal('');
    expect(listDesc?.value).to.equal('');
    expect(listPrivate?.checked).to.be.false;
  });

  it('fields should have data while edit', async () => {
    const userList = {
      id: 'initial-list-id',
      name: 'my first list',
      description: 'my first list description',
      private: true,
    };

    const el = await fixture<IAUserListSettings>(
      html`<iaux-userlist-settings
        .userList=${userList}
      ></iaux-userlist-settings>`
    );
    await el.updateComplete;

    const newListElement = el.shadowRoot?.querySelector('.new-list');
    console.log(newListElement);
    const listId = newListElement?.querySelector('#id') as HTMLInputElement;
    const listName = newListElement?.querySelector('#name') as HTMLInputElement;
    const listDesc = newListElement?.querySelector(
      '#description'
    ) as HTMLInputElement;
    const listPrivate = newListElement?.querySelector(
      '#private'
    ) as HTMLInputElement;

    expect(listId?.value).to.equal(userList.id);
    // expect(listName?.value).to.equal(userList.name);
    expect(listDesc?.value).to.equal(userList.description);
    expect(listPrivate?.checked).to.be.true;
  });

  it('emit setting modal close event', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<iaux-userlist-settings></iaux-userlist-settings>`
    );
    await el.updateComplete;

    const cancelButton = el.shadowRoot?.querySelector(
      '#cancel'
    ) as HTMLInputElement;

    // Define a custom event name
    const customEventName = 'listModalClosed';

    // Listen for the custom event on the custom element
    let customEventFired = false;
    el.addEventListener(customEventName, () => {
      customEventFired = true;
    });

    // Use oneEvent to listen for the custom event
    const customEvent = oneEvent(el, customEventName, true);
    cancelButton?.click();

    // Wait for the custom event to be dispatched and captured
    const event = await customEvent;

    expect(customEventFired).to.be.true;
    expect(event.type).to.equal(customEventName);
    expect(event.target).to.equal(el);
  });
});
