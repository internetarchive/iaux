import { css } from 'lit-element';

export default () => {
  return css`
    .information-menu {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      padding: 0;
      overflow-x: hidden;
      font-size: 1.4rem;
      background: var(--grey20);
    }

    .menu-slider-offscreen {
      transform: translate(-100%, -100%);
    }

    /* Secondary menu */
    @keyframes menu-enter {
      0% {
        transform: translate(100%, 0);
      }
      100% {
        transform: translate(4rem, 0);
      }
    }
    @keyframes menu-exit {
      0% {
        transform: translate(4rem, 0);
      }
      100% {
        transform: translate(100%, 0);
      }
    }
    .menu-enter {
      animation: menu-enter 0.2s forwards;
    }
    .menu-exit {
      animation: menu-exit 0.2s forwards;
    }

    .info-box {
      padding: 0 1rem;
    }
  `;
};
