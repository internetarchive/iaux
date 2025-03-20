import { css } from "lit";

export default css`
  div {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 0.8rem;
    margin: 0;
    padding: 0;
    border: none;
  }

  input[type="text"] {
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    border: 1px solid var(--savePageInputBorder);
    border-radius: 0.5rem;
    color: var(--grey13);
    font-size: inherit;
  }

  input[type="submit"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0.4rem 0.8rem;
    font: normal 1.3rem var(--themeFontFamily);
    text-transform: uppercase;
    color: var(--savePageSubmitText);
    border: none;
    border-radius: 16px;
    background: var(--savePageSubmitBg);
    cursor: pointer;
  }

  .error {
    display: none;
    margin-top: 0.5rem;
    font-weight: bold;
    color: var(--savePageErrorText);
  }

  .visible {
    display: block;
  }

  @media (min-width: 890px) {
    h3 {
      margin-top: 0;
      font: normal 100 1.6rem var(--themeFontFamily);
    }
  }
`;
