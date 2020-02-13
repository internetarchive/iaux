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
      background-color: var(--grey13);
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
    .menu-group {
      height: 80vh;
    }
    .menu-item {
      width: 100%;
      background: transparent;
      font-size: inherit;
      cursor: pointer;
      height: 12%;
      border: none;
      text-align: left;
      padding: 0;
    }
    .menu-item:focus {
      outline: none;
    }
    .menu-item > .label {
      color: var(--grey999);
      text-align: left;
      display: inline;
    }
    .menu-item > .icon {
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
