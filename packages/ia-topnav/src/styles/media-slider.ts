import { css } from 'lit';

export default css`
  .media-slider-container {
    position: relative;
  }

  .overflow-clip {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 0;
    overflow: hidden;
    transition: height 0.2s ease;
  }

  .information-menu {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: 0;
    height: 31.9rem;
    overflow-x: hidden;
    font-size: 1.4rem;
    background: var(--mediaSliderBg);
  }

  .open {
    display: block;
  }

  .hidden {
    display: none;
  }

  .info-box {
    padding: 1rem;
  }

  @media (max-width: 889px) {
    .overflow-clip.open {
      display: block;
      height: 35.8rem;
      left: 4rem;
      top: 0;
    }
  }

  @media (min-width: 890px) {
    .overflow-clip {
      display: block;
    }

    .information-menu {
      left: 0;
      z-index: 3;
      height: auto;
      min-height: 21rem;
      background: var(--mediaSliderDesktopBg);
      transform: translate(0, -100%);
      transition: transform 0.2s ease;
    }

    .overflow-clip.open {
      height: 22rem;
    }

    .information-menu.open {
      transform: translate(0, 0);
    }

    .info-box {
      max-width: 100rem;
      padding: 1.5rem 0;
      margin: 0 auto;
    }
  }
`;
