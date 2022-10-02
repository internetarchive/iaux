import { css } from 'https://offshoot.ux.archive.org/lit.js';

export default css`
  @media (min-width: 890px) {
    .initial,
    .closed,
    .open {
      right: 21.3rem;
    }

    .search-hidden.initial,
    .search-hidden.closed,
    .search-hidden.open {
      right: 5.8rem;
    }
  }

  @media (min-width: 990px) {
    .initial,
    .closed,
    .open {
      right: 27.5rem;
    }

    .search-hidden.initial,
    .search-hidden.closed,
    .search-hidden.open {
      right: 12rem;
    }
  }
`;
