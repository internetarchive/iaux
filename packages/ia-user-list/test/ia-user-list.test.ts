/* eslint-disable */

import {
  html,
  fixture,
  expect,
} from '@open-wc/testing';

import type { IAUserList } from '../src/ia-user-list';
import '../src/ia-user-list';

describe('IAUserList', () => {
  it('has defined fields rendered', async () => {
    const el = await fixture<IAUserList>(html`<ia-user-list></ia-user-list>`);

    const newListElement = el.shadowRoot?.querySelector('.new-list');
    const listId = newListElement?.querySelector('#list-id');
    const listName = newListElement?.querySelector('#list-name');
    const listDesc = newListElement?.querySelector('#list-description');
    const listPrivate = newListElement?.querySelector('#list-private');

    expect(newListElement).exist;
    expect(listId).exist;
    expect(listName).exist;
    expect(listDesc).exist;
    expect(listPrivate).exist;
  });

  it('has button rendered', async () => {
    const el = await fixture<IAUserList>(html`<ia-user-list></ia-user-list>`);

    const modalFooterElement = el.shadowRoot?.querySelector('.footer');
    const cancelButton = modalFooterElement?.querySelector('.ia-button.dark');
    const saveButton = modalFooterElement?.querySelector('.ia-button.primary');
    expect(cancelButton).exist;
    expect(saveButton).exist;
  });

  it('by default fields are empty/undefined', async () => {
    const el = await fixture<IAUserList>(html`<ia-user-list></ia-user-list>`);

    const newListElement = el.shadowRoot?.querySelector('.new-list');

    const listId = newListElement?.querySelector('#list-id');
    const listName = newListElement?.querySelector('#list-name');
    const listDesc = newListElement?.querySelector('#list-description');
    const listPrivate = newListElement?.querySelector('#list-private');

    expect(listId?.textContent).to.equal('');
    expect(listName?.textContent).to.equal('');
    expect(listDesc?.textContent).to.equal('');
    expect(listPrivate?.textContent).to.equal('');
  });

  it('fields should have data while edit', async () => {
    const listData = {
      listId: 'initial-list-id',
      listName: 'my first list',
      description: 'my first list description',
      private: true,
    };

    const el = await fixture<IAUserList>(
      html`<ia-user-list .listData=${listData}></ia-user-list>`
    );
    await el.updateComplete;

    const newListElement = el.shadowRoot?.querySelector('.new-list');

    const listId = newListElement?.querySelector('#list-id');
    const listName = newListElement?.querySelector('#list-name');
    const listDesc = newListElement?.querySelector('#list-description');
    const listPrivate = newListElement?.querySelector('#list-private');

    expect(listId?.getAttribute('value')).to.equal('initial-list-id');
    expect(listName?.getAttribute('value')).to.equal('my first list');
    expect(listDesc?.textContent).to.equal('my first list description');
    expect(listPrivate?.getAttribute('checked')).exist;
  });

  // it('emit setting modal close event', async () => {
  //   const el = await fixture<IAUserList>(html`<ia-user-list></ia-user-list>`);
  //   await el.updateComplete;

  //   const cancelButton = el.shadowRoot?.querySelector('#cancel');

  //   // Define a custom event name
  //   const customEventName = 'listModalClosed';

  //   // Listen for the custom event on the custom element
  //   let customEventFired = false;
  //   el.addEventListener(customEventName, () => {
  //     customEventFired = true;
  //   });

  //   await el.updateComplete;

  //   // Dispatch a custom event on the button when it's clicked
  //   await cancelButton?.addEventListener('click', event => {
  //     console.log('jjjjjjjjjjj');
  //     event.preventDefault();
  //     event.stopPropagation();
  //     const customEvent = new Event(customEventName);
  //     cancelButton?.dispatchEvent(customEvent);

  //     customEventFired = true;
  //     console.log('ssssssssssssssssss');
  //   });

  //   // Wait for the next frame to ensure the custom event is processed
  //   // await nextFrame();

  //   // console.log(cancelButton);
  //   // Check if the custom event was fired
  //   expect(customEventFired).to.be.true;
  // });
});
