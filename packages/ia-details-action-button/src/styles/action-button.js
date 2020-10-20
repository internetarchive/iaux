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
    vertical-align: unset;
  }

  .favorite-button.favorited, .favorite-button:hover {
    color: #f0b534! important;
    border: 1px solid #f0b534;
    background-color: #fcf0d6;
  }
  .favorite-button .favorite-icon {
    color: #f0b534! important;
  }

  .share-button:hover {
    color: #428bca! important;
    border: 1px solid #428bca;
    background-color: #d9e8f4;
  }

  .borrow-program-button:hover {
    color: #428bca! important;
    border: 1px solid #428bca;
    background-color: #d9e8f4;
  }

  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    height: 40px;
    display: inline;
    vertical-align: middle;
  }
  .favorite-button, .share-button {
    width: 84px;
  }
  .button span {
    display: block;
  }
  .favorite-icon {
    height: 15px;
  }
  .borrow-program-button {
    padding: 1px 5px;
    vertical-align: middle;
    border: 1px solid black;
    text-decoration: none;
    color: var(--textColor);
  }

  .button {
    border-radius: 3px;
    text-decoration: none;
    display: inline-block;
    font: normal 1.2rem/1.5 var(--themeFontFamily);
    border: 1px solid black;
    color: var(--textColor);
    outline: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    pointer: cursor;
  }
  .search-field .fill-color {
    fill: var(--iconFill);
  }

  input:focus + svg {
    display: none;
  }

  @media (min-width: 890px) {
    form {
      margin: 0 auto;
    }

    p {
      margin-bottom: 3rem;
      font-size: 1.6rem;
      text-align: center;
    }

    img {
      margin: 0;
    }

    fieldset {
      margin: 0 auto;
      font-size: 0;
    }

    fieldset a,
    .search-field {
      display: inline-block;
      width: 50%;
      vertical-align: middle;
    }

    fieldset a {
      text-align: center;
    }

    .search-field svg {
      width: 28px;
      height: 28px;
    }

    .search-field .fill-color {
      fill: var(--desktopSearchIconFill);
    }
  }
`;
