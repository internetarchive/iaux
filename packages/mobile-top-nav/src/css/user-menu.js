import { css } from 'lit-element';

export default () => {
  return css`
    nav {
      float: right;
      font-size: 1.6rem;
      background-color: var(--grey20);
    }
    nav.tx-slide {
      overflow: hidden;
      transition-property: max-height;
      transition-duration: .5s;
      transition-timing-function: ease;
    }
    nav.tx-slide.initial,
    nav.tx-slide.closed {
      max-height: 0;
    }
    nav.tx-slide.closed {
      transition-duration: 0.1s;
    }
    nav.tx-slide.open {
      max-height: 100vh;
      max-width: 100vw;
    }
    h3 {
      padding: .6rem 2rem;
      margin: 0;
      font-size: inherit;
    }
    ul {
      padding: .4rem 0 .7rem 0;
      margin: 0;
    }
    a {
      display: block;
      color: var(--primary-text-color);
      text-decoration: none;
      padding: 1rem 2rem;
    }
  `;
};
