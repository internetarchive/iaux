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
      position: relative;
      margin: 0;
      width: 100%;
      background-color: var(--grey20);
      display: flex;
      flex-direction: column;
    }
    .search-menu.tx-slide {
      overflow: hidden;
      transition-property: max-height;
      transition-duration: 1.5s;
      transition-timing-function: ease;
    }
    .search-menu.tx-slide.initial,
    .search-menu.tx-slide.closed {
      max-height: 0;
    }
    .search-menu.tx-slide.closed {
      transition-duration: 0.1s;
    }
    .search-menu.tx-slide.open {
      max-height: 100vh;
    }
    .search-options {
      align-self: center;
      min-width: 38%;
      margin-bottom: 1%;
    }

    .search-options > * {
      padding: 3%;
      display: block;
    }

    .search-options .advanced-search {
      text-decoration: none;
      color: var(--link-color);
    }
  `;
};
