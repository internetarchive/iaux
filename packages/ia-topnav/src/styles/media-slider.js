import { css } from 'lit-element';

export default css`
  .information-menu {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: 0;
    height: 368px;
    overflow-x: hidden;
    font-size: 1.4rem;
    background: var(--mediaSliderBg);
  }

  .overflow-clip {
    position: absolute;
    top: 4rem;
    right: 0;
    left: 4rem;
    height: 368px;
    overflow-x: hidden;
  }
  .overflow-clip.menu-exit,
  .overflow-clip.menu-slider-offscreen {
    display: none;
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
      transform: translate(0, 0);
    }
  }
  @keyframes menu-exit {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(100%, 0);
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

  .information-menu.menu-enter {
    animation: menu-enter 0.2s forwards;
  }
  .information-menu.menu-exit {
    animation: menu-exit 0.2s forwards;
  }

  .info-box {
    padding: 1rem;
  }

  @media (min-width: 890px) {
    .overflow-clip {
      top: 0;
      left: 0;
      height: auto;
      overflow-x: visible;
    }
    .overflow-clip.menu-exit,
    .overflow-clip.menu-slider-offscreen {
      display: block;
    }

    .information-menu {
      left: 0;
      z-index: 1;
      height: auto;
      min-height: 21rem;
      background: var(--mediaSliderDesktopBg);
    }

    .information-menu.menu-enter {
      transform: translate(0, 8rem);
      animation-name: menu-enter-desktop;
    }

    .information-menu.menu-exit {
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
