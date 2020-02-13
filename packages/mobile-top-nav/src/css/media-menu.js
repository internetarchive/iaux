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
      position: relative;
      height: 80vh;
    }
    .menu-item {
      width: 100%;
      background: transparent;
      font-size: 1.6rem;
      cursor: pointer;
      border: none;
      text-align: left;
      padding: .1rem 0;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
    .menu-item:focus {
      outline: none;
    }
    .menu-item > .label {
      display: inline-block;
      color: var(--white);
      text-align: left;
      vertical-align: middle;
    }
    .menu-item > .icon {
      display: inline-flex;
      width: 42px;
      height: 42px;
      vertical-align: middle;
      align-items: center;
      justify-content: center;
    }
    .menu-item.selected .icon {
      background-color: var(--grey20);
      border-radius: 17% 0 0 17%;
    }
  `;
};
