import { css } from 'lit-element';
import actionButtonCSS from '../styles/action-button';

export default css`
  ${actionButtonCSS}
  :host {
    --buttonBlue: #194880;
    --white: #fff;
    --textColor: #333;
    --shareFillColor: #428bca;

    --iconFillColor: var(--shareFillColor);
    --linkColor: var(--white);
  }

  .share-button:hover {
    color: #428bca! important;
    border: 1px solid #428bca;
    background-color: #d9e8f4;
    fill: var(--iconFillColor);
  }

  @media (min-width: 890px) {
    form {
      margin: 0 auto;
    }
  }
`;
