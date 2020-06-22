import { css } from 'lit-element';
import { subnavListCSS } from './base';

export default [subnavListCSS, css`
  @media (min-width: 890px) {
    :host {
      display: block;
      grid-column: 1 / 4;
      padding: 0 1.5rem;
    }

    h4 {
      margin-top: 0;
      font: normal 100 1.6rem var(--themeFontFamily);
    }

    .grid {
      display: grid;
      grid-template-columns: minmax(auto, 260px) 1fr minmax(auto, 260px);
      /* Possible for 890 - 935: minmax(auto, 260px) 1fr minmax(auto, 260px) */
      grid-column-gap: 2.5rem;
    }

    .link-lists {
      display: grid;
      grid-template-columns: calc(50% - 1.25rem) calc(50% - 1.25rem);
      grid-column-gap: 2.5rem;
    }
  }
`];
