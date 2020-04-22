import { css } from 'lit-element';

export default css`
  nav {
    z-index: 1;
  }

  .open {
    top: 4rem;
  }

  @media (min-width: 890px) {
    nav {
      z-index: 5;
    }

    .initial,
    .closed {
      top: -100vh;
      right: 26rem;
    }

    .open {
      top: 5.1rem;
      right: 26rem;
    }
  }
`;
