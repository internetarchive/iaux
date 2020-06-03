import { css } from 'lit-element';
import { subnavListCSS } from './base';

export default [subnavListCSS, css`
  @media (min-width: 890px) {
    :host {
      display: block;
      grid-column: 1 / 4;
    }

    h4 {
      margin-top: 0;
      font: normal 100 1.6rem var(--themeFontFamily);
    }

    .grid {
      display: grid;
      grid-template-columns: 30% 40% 30%;
      grid-column-gap: 2.5rem;
    }

    .link-lists {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-column-gap: 2.5rem;
    }
  }
`];
