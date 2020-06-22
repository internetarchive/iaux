import { css } from 'lit-element';

export default css`
  form {
  }

  p {
    margin-bottom: 1rem;
    font-size: 1.6rem;
    text-align: center;
  }

  fieldset {
    padding: .5rem;
    border-radius: 5px;
    box-shadow: none;
  }

  input {
    padding-left: 3rem;
    margin-top: .3rem;
    font-size: 1.4rem;
    border-color: #bca38e;
    background: #fff;
  }

  input::placeholder,
  input::-webkit-input-placeholder {
    color: #8e8e8e;
  }

  .search-field svg {
    top: 50%;
    transform: translateY(-50%);
  }

  @media (min-width: 890px) {
    fieldset a,
    .search-field {
      display: block;
      width: auto;
    }

    fieldset a {
      margin: 0 1.5rem;
    }
  }
`;
