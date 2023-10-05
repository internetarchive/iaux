/* eslint-disable no-undef */
/* eslint-disable lit/no-value-attribute */

import { html, css, LitElement, TemplateResult } from 'lit';
import { property, customElement, query } from 'lit-element/decorators.js';
import IAButtonStyles from './style/ia-button';

export interface UserListModel {
  id?: string;
  list_name: string | TemplateResult;
  description?: string | TemplateResult;
  is_private?: boolean;
  date_created?: Date;
  date_updated?: Date;
}

@customElement('iaux-userlist-settings')
export class IAUserListSettings extends LitElement {
  /**
   * contains userlist information
   */
  @property({ type: Object }) userList?: UserListModel;

  /**
   * base api URL for userlist service
   */
  @property({ type: String }) baseAPIUrl: string = 'archive.org';

  @query('#id') private listId: HTMLInputElement;

  @query('#name') private listName: HTMLInputElement;

  @query('#description') private listDescription: HTMLInputElement;

  @query('#private') private listPrivate: HTMLInputElement;

  private async saveListDetails(event: Event) {
    event.preventDefault();

    let HttpMethod = 'POST';
    if (this.listId.value !== 'undefined') {
      HttpMethod = 'PATCH';
      this.baseAPIUrl = `${this.baseAPIUrl}/${this.listId.value}`;
    }

    try {
      const requestInit: RequestInit = {};
      requestInit.credentials = 'include';
      requestInit.method = HttpMethod;
      requestInit.body = JSON.stringify({
        id: this.listId.value,
        list_name: this.listName.value,
        description: this.listDescription.value,
        is_private: this.listPrivate.checked,
      });

      const response = await fetch(this.baseAPIUrl, requestInit);

      this.dispatchEvent(
        new CustomEvent('userListSaved', {
          detail: {
            inputData: requestInit,
            outputData: response,
          },
        })
      );
    } catch (error) {
      this.dispatchEvent(
        new CustomEvent('userListError', {
          detail: { error },
        })
      );
      console.log('error', error);
    }
  }

  private emitCloseModalEvent() {
    this.dispatchEvent(new Event('listModalClosed'));
  }

  render() {
    return html`
      <section class="new-list">
        <form id="user-list-form" @submit=${this.saveListDetails}>
          <div class="field">
            <input type="hidden" id="id" .value=${this.userList?.id} />
            <label for="name">List name*</label>
            <input
              type="text"
              id="name"
              value=${this.userList?.list_name}
              required
            />
          </div>
          <div class="field">
            <label for="description">Description</label>
            <textarea
              id="description"
              .value=${this.userList?.description ?? ''}
            ></textarea>
          </div>
          <div class="field">
            <label for="private">Private list</label>
            <input
              type="checkbox"
              id="private"
              .checked="${this.userList?.is_private}"
            />
          </div>
          <div class="footer field">
            <button
              class="ia-button dark"
              id="cancel"
              @click=${this.emitCloseModalEvent}
            >
              Cancel
            </button>
            <button class="ia-button primary">Save</button>
          </div>
        </form>
      </section>
    `;
  }

  static styles = [
    IAButtonStyles,
    css`
      :host {
        display: block;
        padding: 15px 0 0 0;
        font-size: 14px;
        position: relative;
      }

      .field {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }

      label {
        display: inline-block;
        width: 90px;
        text-align: left;
        margin-right: 10px;
        font-weight: 700;
      }

      input[type='text'],
      textarea {
        line-height: 20px;
        padding: 5px;
        border-radius: 5px;
        width: 270px;
        font-family: inherit;
        font-size: inherit;
        resize: none;
        border-style: solid;
        outline: none;
        border-radius: 4px;
        border-width: 1px;
        border-color: #999;
      }

      input[type='checkbox'] {
        cursor: pointer;
        margin: 0;
      }

      label[for='private'] {
        cursor: pointer;
      }

      .footer {
        display: block;
        text-align: center;
        margin: 10px 0 0 0;
      }

      .ia-button {
        display: initial;
        padding: 0 15px;
        height: 3.5rem;
      }
    `,
  ];
}
