import { css } from 'lit-element';
import actionButtonCSS from '../styles/action-button';

export default css`
  ${actionButtonCSS}
  :host {
    --buttonBlue: #194880;
    --white: #fff;
    --textColor: #333;
    --favoriteFillColor: rgb(240, 181, 52);

    --iconFillColor: var(--favoriteFillColor);
    --linkColor: var(--white);
  }

  .favorite-button.favorited, .favorite-button:hover {
    color: #f0b534! important;
    border: 1px solid #f0b534;
    background-color: #fcf0d6;
    fill: var(--iconFillColor);
  }

  .favorite-button .favorite-icon {
    color: #f0b534! important;
  }

  .favorite-button, .share-button, .flag-button {
    width: 84px;
  }

  .favorite-icon {
    height: 15px;
  }

  .hidden {
    display: none;
  }

  @media (min-width: 890px) {
    form {
      margin: 0 auto;
    }

  }
`;
