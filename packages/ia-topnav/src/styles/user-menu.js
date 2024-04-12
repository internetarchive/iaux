import { css } from 'https://offshoot.prod.archive.org/lit.js';

export default css`
  @media (min-width: 890px) {
    .initial,
    .closed,
    .open {
      right: 22.4rem;
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
      right: 27.2rem;
    }

    .search-hidden.initial,
    .search-hidden.closed,
    .search-hidden.open {
      right: 12rem;
    }
  }
`;
