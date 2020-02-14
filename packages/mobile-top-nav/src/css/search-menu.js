import { css } from 'lit-element';

export default () => {
  return css`
    button:focus,
    input:focus {
      outline-color: var(--link-color);
      outline-width: 0.16rem;
      outline-style: auto;
    }
    .search-menu {
      font-size: 1.6rem;
      background-color: var(--grey20);
    }
    .search-menu.tx-slide {
      overflow: hidden;
      transition-property: max-height;
      transition-duration: .2s;
      transition-timing-function: ease;
    }
    .search-menu.tx-slide.initial,
    .search-menu.tx-slide.closed {
      max-height: 0;
    }
    .search-menu.tx-slide.closed {
      transition-duration: 0.2s;
    }
    .search-menu.tx-slide.open {
      max-height: 100vh;
    }
    .search-options {
      padding: 0 4.5rem;
    }

    .search-options > * {
      padding: 1rem;
      display: block;
    }

    .search-options .advanced-search {
      text-decoration: none;
      color: var(--link-color);
    }
  `;
};
