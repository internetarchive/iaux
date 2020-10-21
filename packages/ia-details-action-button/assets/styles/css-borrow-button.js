import { css } from 'lit-element';
import actionButtonCSS from '../styles/action-button';

export default css`
  ${actionButtonCSS}
  :host {
    --buttonBlue: #194880;
    --white: #fff;
    --textColor: #333;

    --iconFillColor: var(--white);
    --linkColor: var(--white);
  }

  .borrow-program-button:hover {
    color: #428bca! important;
    border: 1px solid #428bca;
    background-color: #d9e8f4;
  }


  .borrow-program-button {
    padding: 0 5px;
    vertical-align: middle;
    border: 1px solid black;
    text-decoration: none;
    color: var(--textColor);
  }

  
  @media (min-width: 890px) {
    form {
      margin: 0 auto;
    }
  }
`;
