import { css } from 'lit-element';

export default css`
  .media-menu {
    position: absolute;
    z-index: -1;
    top: -80vh;
    width: 100%;
    background-color: var(--grey13);
    margin: 0;
    overflow: hidden;
  }

  .media-menu.tx-slide {
    transition-property: top;
    transition-duration: 0.2s;
    transition-timing-function: ease;
  }

  .media-menu.tx-slide.open {
    top: 100%;
  }

  .media-menu.tx-slide.initial,
  .media-menu.tx-slide.closed {
    top: -80vh;
  }

  .media-menu.tx-slide.closed {
    transition-duration: 0.2s;
  }

  .menu-group {
    position: relative;
  }

  @media (min-width: 768px) {
    .media-menu {
      display: inline-block;
      top: 0;
      left: var(--logoWidthTablet);
      z-index: 1;
      width: auto;
      height: 5rem;
    }

    .media-menu.tx-slide {
      transition-property: none;
    }

    .media-menu.tx-slide.open,
    .media-menu.tx-slide.closed,
    .media-menu.tx-slide.initial {
      top: 0;
    }
  }
`;
