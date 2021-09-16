import { css } from 'lit-element';

export default css`
  :host {
    outline: none;
  }

  .media-menu {
    z-index: -1;
    top: -40rem;
    background-color: var(--mediaMenuBg);
    margin: 0;
    overflow: hidden;
    transition-duration: 0.2s;
    transition-property: top;
    transition-timing-function: ease;
  }

  .menu-group {
    position: relative;
    line-height: normal;
  }

  /* Mobile view styles */
  @media (max-width: 889px) {
    .media-menu-container {
      position: relative;
    }

    .media-menu {
      position: absolute;
      width: 100%;
    }

    .open .media-menu {
      top: 0;
    }

    .overflow-clip {
      position: absolute;
      z-index: -1; /** needs to be under the navigation, otherwise it intercepts clicks */
      top: 0;
      left: 0;
      height: 0;
      width: 100%;
      overflow: hidden;
      transition-duration: 0.2s;
      transition-property: height;
    }

    .open .overflow-clip {
      height: 40rem;
    }
  }

  /* Desktop view styles */
  @media (min-width: 890px) {
    .media-menu {
      display: inline-block;
      position: static;
      width: auto;
      height: 5rem;
      transition-property: none;
    }

    .menu-group {
      font-size: 0;
    }
  }
`;
