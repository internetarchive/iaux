import { css } from 'https://offshoot.prod.archive.org/lit.js';

export default css`
  @media (min-width: 890px) {
    .initial,
    .closed,
    .open {
      right: 35rem;
    }

    .search-hidden.initial,
    .search-hidden.closed,
    .search-hidden.open {
      right: 18.5rem;
    }
  }

  @media (min-width: 990px) {
    .initial,
    .closed,
    .open {
      right: 41rem;
    }

    .search-hidden.initial,
    .search-hidden.closed,
    .search-hidden.open {
      right: 26rem;
    }
  }
`;
