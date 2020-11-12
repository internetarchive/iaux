import { css } from 'lit-element';
import actionButtonCSS from '../styles/action-button';

export default css`
  ${actionButtonCSS}
  :host {
    --white: #41842f;
    --bgColor: #41842f;
    --textColor: #333;

    --iconFillColor: var(--white);
    --linkColor: var(--white);
  }

  .borrow-program-button:hover {
    color: var(--bgColor);
    border: 1px solid var(--iconFillColor);
    fill: var(--iconFillColor);
  }
`;
