import { css } from 'lit-element';

export default css`
  a {
    text-decoration: none;
    color: var(--activeColor);
  }

  img {
    display: block;
    width: 90px;
    height: 90px;
    margin: 0 auto 1rem auto;
    border-radius: 45px;
  }

  h3 {
    margin-top: 0;
    font-size: 1.8rem;
  }

  h4 {
    font-size: 1.6rem;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li + li {
    padding-top: 1.5rem;
  }

  .icon-links {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
  }

  .icon-links a {
    display: inline-block;
    width: 120px;
    margin-bottom: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
  }

  .icon-links a + a {
    margin-left: 2rem;
  }

  .featured h4 {
    display: none;
  }

  @media (min-width: 890px) {
    :host {
      display: grid;
      grid-template-columns: 40% 20% 40%;
    }

    h3 {
      display: none;
    }

    h4 {
      margin: 0 0 1rem 0;
      font-weight: 100;
    }

    ul {
      font-size: 1.3rem;
    }

    li {
      padding-bottom: .5rem;
    }

    li + li {
      padding-top: 0;
    }

    li a {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon-links a {
      padding-top: 3.5rem;
      max-width: 160px;
    }

    .links {
      padding: 0 1.5rem;
    }

    .featured h4 {
      display: block;
    }

    .top ul {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: repeat(7, auto);
      grid-column-gap: 3rem;
      grid-auto-flow: column;
    }
  }
`;
