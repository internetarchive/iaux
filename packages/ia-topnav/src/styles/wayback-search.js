import { css } from 'lit-element';

export default css`
  form {
    display: grid;
    grid-template-areas: "search" "message";
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  p {
    grid-area: message;
    padding-top: .5rem;
    font-size: 1.4rem;
  }

  fieldset {
    grid-area: search;
    margin: 0;
  }

  @media (min-width: 890px) {
    p {
      text-align: left;
    }

    fieldset a,
    .search-field {
      display: block;
      width: auto;
    }
  }
`;
