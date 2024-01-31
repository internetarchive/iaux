import { html, css, LitElement } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { Result } from '@internetarchive/result-type';
import IAButtonStyles from './style/ia-button';
import { UserListsService } from './user-lists-service/user-lists-service';
import { UserListsError } from './user-lists-service/user-lists-error';
import { UserList, UserListOptions } from './user-lists-service/models';

export interface UserListModel {
  id?: string;
  list_name: string;
  description?: string;
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
   * User lists service to use for creating/updating lists
   */
  @property({ type: Object }) userListsService: UserListsService;

  @query('#id') private listId: HTMLInputElement;

  @query('#name') private listName: HTMLInputElement;

  @query('#description') private listDescription: HTMLInputElement;

  @query('#private') private listPrivate: HTMLInputElement;

  private async saveListDetails(event: Event) {
    event.preventDefault();
    const submitButton = (event.target as HTMLElement)?.querySelector(
      'button#save-list-settings'
    );
    submitButton?.setAttribute('disabled', 'true');

    this.dispatchEvent(new Event('userListSaving'));

    try {
      const userListData: UserListOptions = {
        list_name: this.listName.value,
        description: this.listDescription.value,
        is_private: this.listPrivate.checked,
      };

      let response: Result<UserList, UserListsError>;
      if (this.userList?.id) {
        response = await this.userListsService?.updateList(
          this.userList.id,
          userListData
        );
      } else {
        response = await this.userListsService?.createList(userListData);
      }

      if (response.success) {
        this.dispatchEvent(
          new CustomEvent<UserList>('userListSaved', {
            detail: response.success,
          })
        );
      } else {
        throw response.error;
      }
    } catch (error) {
      this.dispatchEvent(
        new CustomEvent('userListError', {
          detail: { error },
        })
      );
      // eslint-disable-next-line no-console
      console.log('error', error);
      submitButton?.removeAttribute('disabled');
    }
  }

  private emitCloseModalEvent(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new Event('listModalClosed'));
  }

  render() {
    return html`
      <section class="new-list">
        <form id="user-list-form" @submit=${this.saveListDetails}>
          <div class="field">
            <input type="hidden" id="id" .value=${this.userList?.id ?? ''} />
            <label for="name">List name*</label>
            <input
              type="text"
              id="name"
              .value=${this.userList?.list_name ?? ''}
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
              .checked="${this.userList?.is_private ?? false}"
            />
          </div>
          <div class="footer field">
            <button
              type="button"
              class="ia-button dark"
              id="cancel"
              @click=${this.emitCloseModalEvent}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="save-list-settings"
              class="ia-button primary"
            >
              Save
            </button>
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
