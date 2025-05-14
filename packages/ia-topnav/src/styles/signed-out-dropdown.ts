import { css } from 'lit';

export default css`
  @media (min-width: 890px) {
    .initial,
    .closed,
    .open {
      right: 33.5rem;
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
      right: 26rem;
    }
  }
`;
