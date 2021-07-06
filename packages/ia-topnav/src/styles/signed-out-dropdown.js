import { css } from 'lit-element';

export default css`
  @media (min-width: 890px) {
    .initial,
    .closed,
    .open {
      right: 34rem;
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
      right: 40rem;
    }

    .search-hidden.initial,
    .search-hidden.closed,
    .search-hidden.open {
      right: 24.5rem;
    }
  }
`;
