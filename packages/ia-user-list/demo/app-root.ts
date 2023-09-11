import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ModalConfig, ModalManager } from '@internetarchive/modal-manager';
import '../src/ia-user-list';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() private modalManager: ModalManager;

  private listData = {
    listId: 'hello',
    listName: 'my first list',
    description: 'my first list description',
    private: true,
  };

  render() {
    return html`
      <fieldset class="dev-tools">
        <legend>Dev tools of user list settings</legend>
        <modal-manager></modal-manager>

        <button
          @click=${() => {
            this.showUserListSettingModal('new');
          }}
        >
          Add new
        </button>

        <button
          @click=${() => {
            this.showUserListSettingModal('edit');
          }}
        >
          Edit me
        </button>

        <pre id="response-data" class="hidden"></pre>
      </fieldset>
    `;
  }

  private async showUserListSettingModal(op: string) {
    this.modalManager = this.shadowRoot?.querySelector(
      'modal-manager'
    ) as ModalManager;
    this.modalManager?.setAttribute('id', 'create-user-list-modal');

    const data =
      op === 'edit'
        ? this.listData
        : {};
    const config = new ModalConfig({
      title: html`List settings`,
      headerColor: '#194880',
      showCloseButton: true,
      showHeaderLogo: false,
      closeOnBackdropClick: false,
    });

    const customModalContent = html`
      <ia-user-list
        .listData=${data}
        .apiURL=${'http://localhost:8000/demo'}
        @listModalClosed=${() => {
          this.modalManager.closeModal();
        }}
        @listDetailsSaved=${(e: CustomEvent) => {
          console.log(e.detail);
          this.modalManager.closeModal();
        }}
      ></ia-user-list>
    `;
    await this.modalManager.showModal({ config, customModalContent });
  }

  static styles = css`
    :host {
      display: block;
    }

    /* add the following styles to ensure proper modal visibility */
    body.modal-manager-open {
      overflow: hidden;
    }

    modal-manager {
      display: none;
      --modalTitleLineHeight: 4.5rem;
      --modalHeaderBottomPadding: 0;
      --modalWidth: 40rem;
    }

    modal-manager[mode='open'] {
      display: block;
    }

    .dev-tools {
      font-size: 20px;
      text-align: center;
      width: 400px;
      margin: 40px auto;
      padding: 20px;
    }

    .dev-tools button {
      padding: 10px;
    }
  `;
}
