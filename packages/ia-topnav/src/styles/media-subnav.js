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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: space-evenly;
    -ms-flex-pack: space-evenly;
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
      display: -ms-grid;
      display: grid;
      -ms-grid-columns: 40% 20% 40%;
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
      display: -ms-grid;
      display: grid;
      -ms-grid-columns: 50% 3rem 50%;
      grid-template-columns: 50% 50%;
      -ms-grid-rows: (auto)[7];
      grid-template-rows: repeat(7, auto);
      grid-column-gap: 3rem;
      grid-auto-flow: column;
    }
    .top ul > *:nth-child(1) {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
    }
    .top ul > *:nth-child(2) {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    .top ul > *:nth-child(3) {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
    }
    .top ul > *:nth-child(4) {
      -ms-grid-row: 4;
      -ms-grid-column: 1;
    }
    .top ul > *:nth-child(5) {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
    }
    .top ul > *:nth-child(6) {
      -ms-grid-row: 6;
      -ms-grid-column: 1;
    }
    .top ul > *:nth-child(7) {
      -ms-grid-row: 7;
      -ms-grid-column: 1;
    }
    .top ul > *:nth-child(8) {
      -ms-grid-row: 1;
      -ms-grid-column: 3;
    }
    .top ul > *:nth-child(9) {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
    }
    .top ul > *:nth-child(10) {
      -ms-grid-row: 3;
      -ms-grid-column: 3;
    }
    .top ul > *:nth-child(11) {
      -ms-grid-row: 4;
      -ms-grid-column: 3;
    }
    .top ul > *:nth-child(12) {
      -ms-grid-row: 5;
      -ms-grid-column: 3;
    }
    .top ul > *:nth-child(13) {
      -ms-grid-row: 6;
      -ms-grid-column: 3;
    }
    .top ul > *:nth-child(14) {
      -ms-grid-row: 7;
      -ms-grid-column: 3;
    }
  }
`;
