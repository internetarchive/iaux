import { css } from 'lit-element';

export default css`
  button:focus,
  input:focus {
    outline-color: var(--linkColor);
    outline-width: 0.16rem;
    outline-style: auto;
  }
  .search-menu {
    position: absolute;
    top: -50vh;
    right: 0;
    left: 0;
    z-index: -1;
    padding: 0 4.5rem;
    font-size: 1.6rem;
    background-color: var(--searchMenuBg);
  }
  .search-menu.tx-slide {
    overflow: hidden;
    transition-property: top;
    transition-duration: 0.2s;
    transition-timing-function: ease;
  }
  .search-menu.tx-slide.initial,
  .search-menu.tx-slide.closed {
    top: -50vh;
  }
  .search-menu.tx-slide.closed {
    transition-duration: 0.2s;
  }
  .search-menu.tx-slide.open {
    top: 100%;
  }

  .search-menu > * {
    padding: 1rem;
    display: block;
  }

  .advanced-search {
    text-decoration: none;
    color: var(--linkColor);
  }
`;
