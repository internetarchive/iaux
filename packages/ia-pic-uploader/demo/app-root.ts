import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import '../src/ia-pic-uploader.js';
import type { IAPicUploader } from '../src/ia-pic-uploader.js';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('#full') full!: IAPicUploader;

  @query('#compact') compact!: IAPicUploader;

  render() {
    return html`
      <div id="demo"></div>
        <div class="container">
          <div class="full">
            <h3>It will be used at My Uploads page</h3>
            <ia-pic-uploader
              .maxFileSizeInMB=${3}
              .identifier=${'fav-neeraj_sharma341'}
              .picture=${'/demo/wider-image.jpg'}
              .baseHost=${'ia-petabox-no-waf-post-file-endpoint.dev.archive.org'}
              .validFileTypes=${['image/jpeg', 'image/png', 'image/gif']}
              .type=${'full'}
              lookingAtMyAccount
              @fileUploaded=${(e: Event) => {
                console.log(e);
              }}
              @fileUploadFailed=${(e: CustomEvent) => {
                console.log(e);
              }}
              @fileUploadVerification=${(e: Event) => {
                console.log(e);
              }}
            ></ia-pic-uploader>
          </div>
          <div class="compact">
            <h3>It will be used at new account settings page</h3>
            <ia-pic-uploader
              .maxFileSizeInMB=${3}
              .identifier=${'fav-neeraj_sharma341'}
              .picture=${'/demo/default-preview.jpg'}
              .baseHost=${'ia-petabox-no-waf-post-file-endpoint.dev.archive.org'}
              .type=${'compact'}
              lookingAtMyAccount
              @fileChanged=${(e: CustomEvent) => {
                console.log('called hasErrorFiled()!');
                console.log(e.detail);
              }}
              @fileUploaded=${() => {
                console.log('file Uploaded');
              }}
            ></ia-pic-uploader>
          </div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      #demo {
        margin: 50px;
        display: flex;
        justify-items: center;
        align-items: center;
        font-size: 14px;
      }

      .select-message {
        display: none;
      }

      ia-pic-uploader {
        --imgMaxHeight: 200px;
        --imgMaxWidth: 200px;
      }
      ia-pic-uploader:focus {
        outline: none;
      }

      ia-pic-uploader:focus-visible {
        outline: none;
      }

      .container {
        display: flex;
        width: 100%;
        justify-content: center;
        flex-direction: column;
      }

      .full {
        display: flex;
        flex-direction: column;
      }

      .full,
      .compact {
        padding: 25px 50px;
        border: 1px solid black;
        margin: 20px;
      }
    `;
  }
}
