import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { IaFetchHandler } from '../src/ia-fetch-handler';  

@customElement('app-root')
export class AppRoot extends LitElement {
  @property({ type: Object }) data: any = null;
  @property({ type: String }) error: string = '';
  @property({ type: Boolean }) loading: boolean = false;

  private fetchHandler: IaFetchHandler;

  constructor() {
    super();
    this.fetchHandler = new IaFetchHandler({ 
      iaApiBaseUrl: 'https://archive.org',
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }
  
  async fetchData() {
    this.loading = true;
    this.error = '';
    try {
      const result = await this.fetchHandler.fetchIAApiResponse('/metadata/InformationM');
      this.data = result; 
    } catch (error) {
      this.error = `Error fetching data: ${error}`; 
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="container">
        <h1>Fetch Data</h1>
        ${this.loading
          ? html`<p>Loading...</p>`
          : this.error
          ? html`<p class="error">${this.error}</p>`
          : this.data
          ? html`<pre>${JSON.stringify(this.data, null, 2)}</pre>`
          : html`<p>No data available.</p>`
        }
        <button @click="${this.fetchData}">Retry</button>
      </div>
    `;
  }

  static styles = css`
    .container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    h1 {
      color: #333;
    }

    .error {
      color: red;
    }

    button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }

    button:hover {
      background-color: #0056b3;
    }
  `;
}