import { html, css, LitElement } from 'lit';
import { property, customElement, query } from 'lit-element/decorators.js';

import type { listDataModel } from './models';
import IAButtonStyles from './style/ia-button'

@customElement('ia-user-list')
export class IAUserList extends LitElement {

  /**
   * contains list information
   *
   * @type {UserModel}
   * @memberof IAUserList
   */
  @property({ type: Object }) listData: listDataModel;

  /**
   * base api URL for user list service
   *
   * @memberof IAUserList
   */
  @property({ type: String }) apiURL: string;

  /**
   * @private
   * @type {HTMLInputElement}
   * @memberof IAUserList
   */
  @query('#list-id') private listId: HTMLInputElement;
  
  /**
   * @private
   * @type {HTMLInputElement}
   * @memberof IAUserList
   */
  @query('#list-name') private listName: HTMLInputElement;

  /**
   * @private
   * @type {HTMLInputElement}
   * @memberof IAUserList
   */
  @query('#list-description') private listDescription: HTMLInputElement;

  /**
   * @private
   * @type {HTMLInputElement}
   * @memberof IAUserList
   */
  @query('#list-private') private listPrivate: HTMLInputElement;

  private async saveListDetails(event: Event) {
    event.preventDefault();

    try {
      const requestInit: RequestInit = {};
      requestInit.credentials = 'include';
      requestInit.method = 'PUT';
      requestInit.body = JSON.stringify({
        listId: this.listId.value,
        listName: this.listName.value,
        listDescription: this.listDescription.value,
        listPrivate: this.listPrivate.checked,
      });

      const response = await fetch(this.apiURL, requestInit);
      console.log('response', response)
  
      this.dispatchEvent(new CustomEvent('listDetailsSaved', {
        detail: {
          inputData: requestInit,
          outputData: response
        }
      }));
    } catch (error) {
      console.log('error', error);
    }
  }

  private emitCloseModalEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.dispatchEvent(new Event('listModalClosed'));
  }

  render() {
    return html`
      <section class="new-list">
        <form @submit=${this.saveListDetails}>
          <div class="field">
            <input type="hidden" value="${this.listData.identifier}" id="list-id" />
            <label for="list-name">List name*</label>
            <input type="text" id="list-name" placeholder="Silver age comics are the best" value=${this.listData?.list_name} required />
          </div>
          <div class="field">
            <label for="list-description">Description</label>
            <textarea id="list-description" placeholder="Great comics from the silver age of 1970">${this.listData?.description}</textarea>
          </div>
          <div class="field">
            <label for="list-private">Private list</label>
            <input type="checkbox" id="list-private" .checked="${this.listData.private}" />
          </div>
          <div class="footer field">
            <button class="ia-button dark" @click=${(event: Event) => {
              this.emitCloseModalEvent(event);
            }}>Cancel</button>
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
      }

      .field {
        margin-bottom: 10px;
        display: flex;
        align-items: baseline;
      }

      label {
        display: inline-block;
        width: 85px;
        text-align: right;
        margin-right: 10px;
      }

      input[type=text], textarea {
        line-height: 25px;
        padding: 2px;
        border-radius: 5px;
        width: 270px;
        font-family: inherit;
        font-size: inherit;
      }

      input[type=checkbox] {
        margin: 0;
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
    `
  ];
}
