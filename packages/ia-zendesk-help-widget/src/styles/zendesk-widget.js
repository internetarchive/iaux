import { css } from 'lit-element';

export default css`
  :host {
    font: normal 1.2rem/1.5 var(--themeFontFamily);
  }

  .help-widget {
    position: fixed;
    right: 0px;
    bottom: 20px;
    margin: 0;
    padding: 0.8rem 2rem;
    border-style: none;
    border-radius: 10px 0 0 10px;
    background-color: darkmagenta;
    color: white;
    font-size: 2rem;
    transition: opacity 0.12s linear;
  }
`;
