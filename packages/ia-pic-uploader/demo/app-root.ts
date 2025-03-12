import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import '../src/ia-pic-uploader.js';
import type { IAPicUploader } from '../src/ia-pic-uploader.js';

@customElement('app-root')
export class AppRoot extends LitElement {
  @query('#full') full!: IAPicUploader;

  @query('#compact') compact!: IAPicUploader;

  render() {
    return html`
      <div class="container">
        <div class="full">
          <h3>It will be used at My Uploads page</h3>
          <ia-pic-uploader
            lookingAtMyAccount
            maxFileSizeInMB="3"
            id="full"
            identifier="@453344354534"
            picture="/demo/wider-image.jpg"
            endpoint=""
            .validFileTypes=${['image/jpeg', 'image/png', 'image/gif']}
            type="full"
          ></ia-pic-uploader>
        </div>
        <div class="compact">
          <h3>It will be used at new account settings page</h3>
          <ia-pic-uploader
            lookingAtMyAccount
            maxFileSizeInMB="3"
            id="compact"
            identifier="@453344354534"
            picture="/demo/default-preview.jpg"
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
    `;
  }
}
