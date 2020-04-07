import { css } from 'lit-element';

export default css`
  .information-menu {
    position: absolute;
    top: 0;
    right: 0;
    left: 4rem;
    padding: 0;
    height: 336px;
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
      transform: translate(100%, 4rem);
    }
    100% {
      transform: translate(0, 4rem);
    }
  }
  @keyframes menu-exit {
    0% {
      transform: translate(4rem, 4rem);
    }
    100% {
      transform: translate(100%, 4rem);
    }
  }

  @keyframes menu-enter-desktop {
    0% {
      transform: translate(0, -100%);
    }
    100% {
      transform: translate(0, 8rem);
    }
  }
  @keyframes menu-exit-desktop {
    0% {
      transform: translate(0, 8rem);
    }
    100% {
      transform: translate(0, -100%);
    }
  }

  .menu-enter {
    animation: menu-enter 0.2s forwards;
  }
  .menu-exit {
    animation: menu-exit 0.2s forwards;
  }

  .info-box {
    padding: 1rem;
  }

  @media (min-width: 890px) {
    .information-menu {
      left: 0;
      z-index: 1;
      height: auto;
      min-height: 21rem;
      background: var(--grey28);
    }

    .menu-enter {
      transform: translate(0, 8rem);
      animation-name: menu-enter-desktop;
    }

    .menu-exit {
      transform: translate(0, -100%);
      animation-name: menu-exit-desktop;
    }

    .info-box {
      max-width: 1000px;
      padding: 1.5rem 0;
      margin: 0 auto;
    }
  }
`;
