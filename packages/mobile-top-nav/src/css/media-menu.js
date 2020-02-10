import { css } from 'lit-element';

export default () => {
  return css`
    button:focus {
      outline-color: var(--link-color);
      outline-width: 0.16rem;
      outline-style: auto;
    }
    .media-menu {
      width: 100%;
      background-color: var(--black);
      margin: 0;
      overflow: hidden;
    }
    .media-menu.tx-slide {
      transition-property: max-height;
      transition-duration: 1s;
      transition-timing-function: ease;
    }
    .media-menu.tx-slide.open {
      max-height: 100vh;
    }
    .media-menu.tx-slide.initial,
    .media-menu.tx-slide.closed {
      max-height: 0;
    }
    .media-menu.tx-slide.closed {
      transition-duration: 0.1s;
    }
    .media-menu .menu-group {
      height: 80vh;
    }
    .media-menu .menu-item {
      width: 100%;
      background: transparent;
      font-size: inherit;
      cursor: pointer;
      height: 12%;
      border: none;
      text-align: left;
      padding: 0;
    }
    .media-menu .menu-item > .label {
      color: var(--grey999);
      text-align: left;
      display: inline;
    }
    .media-menu .menu-item > .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 8%;
    }
    .menu-item.selected .icon {
      background-color: var(--grey20);
      border-radius: 17% 0 0 17%;
    }
  `;
};
