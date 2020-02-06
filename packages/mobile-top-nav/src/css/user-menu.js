import { css } from 'lit-element';

export default () => {
  return css`
    .user-menu {
      margin: 0;
      float: right;
      background-color: var(--grey20);
    }
    .user-menu.tx-slide {
      overflow: hidden;
      transition-property: max-height;
      transition-duration: 1.5s;
      transition-timing-function: ease;
    }
    .user-menu.tx-slide.initial,
    .user-menu.tx-slide.closed {
      max-height: 0;
    }
    .user-menu.tx-slide.closed {
      transition-duration: 0.1s;
    }
    .user-menu.tx-slide.open {
      max-height: 100vh;
      max-width: 100vw;
    }
    .user-menu .menu-group {
      min-height: 50vh;
      min-width: 30vw;
      margin: 4% auto;
    }
    .user-menu .menu-group a {
      display: block;
      width: 100%;
      color: var(--primary-text-color);
      text-decoration: none;
      height: 8%;
      padding: 2.5% 5%;
    }
  `;
};
