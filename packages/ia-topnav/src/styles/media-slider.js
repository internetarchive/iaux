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
  .menu-enter {
    animation: menu-enter 0.2s forwards;
  }
  .menu-exit {
    animation: menu-exit 0.2s forwards;
  }

  .info-box {
    padding: 1rem;
  }

  @media (min-width: 768px) {
    .information-menu {
      left: 0;
      height: auto;
      min-height: 21rem;
    }

    .menu-enter {
      transform: translate(0, 5rem);
      animation: none;
    }

    .menu-exit {
      transform: translate(0, -100%);
      animation: none;
    }

    .info-box {
      max-width: 1000px;
      padding: 1.5rem 0;
      margin: 0 auto;
    }
  }
`;
