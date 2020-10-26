import { css } from 'lit-element';

export default css`
  :host {
    --buttonBlue: #194880;
    --white: #fff;
    --textColor: #333;

    --iconFillColor: var(--white);
    --linkColor: var(--white);
  }
  .grid-container1 {
    margin: 100px;
  }
  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    height: 40px;
    display: inline;
    vertical-align: middle;
  }
  .favorite-button, .share-button, .flag-button {
    width: 84px;
  }
  .button span {
    display: block;
    margin-top: -4px;
  }
  .favorite-icon {
    height: 15px;
  }
  .button {
    border-radius: 6px;
    text-decoration: none;
    display: inline-block;
    font: normal 1.2rem/1.5 var(--themeFontFamily);
    border: 1px solid var(--textColor);
    color: var(--textColor);
    outline: none;
    cursor: pointer;
    padding: 5px;
    margin-left: 5px;
  }
  a {
    text-decoration: none;
    pointer: cursor;
  }
  .hidden {
    display: none;
  }
  @media (min-width: 890px) {
  }
`;
