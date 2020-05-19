import { css } from 'lit-element';

export default css`
  @media (min-width: 890px) {
    .initial,
    .closed,
    .open {
      right: 33.7rem;
    }

    .search-hidden.initial,
    .search-hidden.closed,
    .search-hidden.open {
      right: 18.3rem;
    }
  }

  @media (min-width: 990px) {
    .initial,
    .closed,
    .open {
      right: 39.7rem;
    }

    .search-hidden.initial,
    .search-hidden.closed,
    .search-hidden.open {
      right: 23.5rem;
    }
  }
`;
