import { html, css, LitElement, svg, SVGTemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ModalConfig, ModalManager } from '@internetarchive/modal-manager';
import '../src/ia-user-list-settings';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() private modalManager: ModalManager;

  private userList = {
    id: 'hello',
    list_name: 'my first list',
    description: 'my first list description',
    is_private: true,
  };

  get plugIcon(): SVGTemplateResult {
    return svg`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g fill-rule="nonzero">
        <path d="m49.9459358 0c13.7978412 0 25.5896453 4.88776371 35.3754122 14.6632911 9.7857669 9.7755275 14.678652 21.554993 14.678652 35.3383967 0 13.7800281-4.8928851 25.5594936-14.678652 35.3350211-9.7857669 9.7755274-21.577571 14.6632911-35.3754122 14.6632911s-25.5716235-4.8877637-35.3213471-14.6632911c-9.74972353-9.7755275-14.6245887-21.554993-14.6245887-35.3383967-.00224931-9.0014064 2.23243779-17.3524613 6.70406469-25.0531645 4.47162691-7.7007033 10.54380341-13.7834037 18.21652941-18.24810129 7.6727261-4.46469761 16.0145067-6.69704641 25.0253417-6.69704641zm0 6c-7.9548389 0-15.2549008 1.95357387-22.0076943 5.8829701-6.7720278 3.9405885-12.0963254 9.2741139-16.0455165 16.0751171-3.93842488 6.7824623-5.89471047 14.0931257-5.89272481 22.040225 0 12.1941053 4.24437231 22.4500702 12.87283241 31.1013666 8.6242501 8.6470752 18.8695883 12.9003212 31.0731032 12.9003212 12.2065273 0 22.4734846-4.2557068 31.1349929-12.9081521 8.6603017-8.6512398 12.9190715-18.9040965 12.9190715-31.0935357l-.0036695-.6147591c-.1419586-11.9183989-4.4018851-21.9707923-12.915402-30.475401-8.6615083-8.6524453-18.9284656-12.9081521-31.1349929-12.9081521z"/><path d="m56 23v22h22v11h-22v22h-11l-.001-22h-21.999v-11h21.999l.001-22z"/>
      </g>
    </svg>`;
  }

  get editIcon(): SVGTemplateResult {
    return svg`<svg fill="#333"viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>pencil</title>
        <path d="M5.582 20.054l14.886-14.886 6.369 6.369-14.886 14.886-6.369-6.369zM21.153 8.758l-0.698-0.697-11.981 11.98 0.698 0.698 11.981-11.981zM22.549 10.154l-0.698-0.698-11.981 11.982 0.697 0.697 11.982-11.981zM23.945 11.55l-0.698-0.698-11.981 11.981 0.698 0.698 11.981-11.981zM23.319 2.356c0.781-0.783 2.045-0.788 2.82-0.013l3.512 3.512c0.775 0.775 0.77 2.038-0.012 2.82l-2.17 2.17-6.32-6.32 2.17-2.169zM5.092 20.883l6.030 6.030-5.284 1.877-2.623-2.623 1.877-5.284zM4.837 29.117l-3.066 1.117 1.117-3.066 1.949 1.949z"/>
      </svg>
      `;
  }

  render() {
    return html`
      <fieldset class="dev-tools">
        <legend>Dev tools of user list settings</legend>
        <modal-manager></modal-manager>

        <label
          >Add button on userlists dropdown on profile page
          <button
            type="button"
            class="add-new-list"
            title="Create list"
            @click=${() => this.showUserListSettingModal('new')}
          >
            ${this.plugIcon}
          </button>
        </label>

        <label
          >Edit button on userlist banner on profile page
          <button
            type="button"
            class="add-new-list"
            title="Create list"
            @click=${() => this.showUserListSettingModal('edit')}
          >
            ${this.editIcon}
          </button>
        </label>

        <label
          >Add button on /details page on petabox size
          <button
            type="button"
            class="add-new-list"
            title="Create list"
            @click=${() => this.showUserListSettingModal('new')}
          >
            ${this.plugIcon} New list
          </button>
        </label>
        <pre id="response-data" class="hidden"></pre>
      </fieldset>
    `;
  }

  private async showUserListSettingModal(op: string) {
    this.modalManager = this.shadowRoot?.querySelector(
      'modal-manager'
    ) as ModalManager;
    this.modalManager?.setAttribute('id', 'create-user-list-modal');

    const data = op === 'edit' ? this.userList : {};

    const config = new ModalConfig({
      title: html`List settings`,
      headerColor: '#194880',
      showCloseButton: true,
      showHeaderLogo: false,
      closeOnBackdropClick: true,
    });

    const customModalContent = html`
      <iaux-userlist-settings
        .userList=${data}
        .baseAPIUrl=${'https://ia-petabox-webdev-6421-user-list-servive-phase-2.archive.org/services/users/me/lists'}
        @listModalClosed=${() => {
          this.modalManager.closeModal();
        }}
        @listDetailsSaved=${(e: CustomEvent) => {
          console.log(e.detail);
          this.modalManager.closeModal();
        }}
      ></iaux-userlist-settings>
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

    .dev-tools label {
      font-size: 14px;
      margin: 10px;
      display: grid;
      text-align: left;
      margin: 20px;
    }
    .dev-tools button {
      padding: 10px;

      background: none;
      border: medium none;
      cursor: pointer;
      height: 20px;
      width: 20px;
      padding: 0px;
      margin: 0px;
    }
  `;
}
