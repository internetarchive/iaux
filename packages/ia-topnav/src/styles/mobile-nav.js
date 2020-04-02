import { css } from 'lit-element';

export default css`
  button:focus,
  a:focus,
  input:focus {
    outline: none;
  }

  nav {
    position: relative;
    display: grid;
    height: 4rem;
    grid-template-areas: "hamburger empty search user";
    grid-template-columns: 4rem auto 4.3rem 5rem;
    grid-template-rows: 100%;
    background: var(--grey13);
    border-bottom: 1px solid var(--grey20);
  }

  button {
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
  }

  .link-home {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    text-decoration: none;
    transform: translate(-50%, -50%);
  }

  .ia-logo {
    display: block;
  }

  .ia-wordmark {
    display: none;
  }

  .hamburger {
    grid-area: hamburger;
    padding: 0;
  }

  .search-trigger {
    grid-area: search;
    position: relative;
    padding: 0;
    z-index: 1;
    align-items: center;
  }

  .search-activated {
    position: relative;
    z-index: 3;
  }

  .search-trigger {
    width: 100%;
    text-align: right;
  }

  .user-info {
    grid-area: user;
    align-self: stretch;
    justify-self: end;
  }

  .user-menu {
    height: 100%;
    padding: .5rem 1rem;
  }

  .user-menu.active {
    border-radius: 1rem 1rem 0 0;
    background: var(--grey20);
  }

  .user-menu img {
    display: block;
    width: 30px;
    height: 30px;
  }

  @media (min-width: 768px) {
    nav {
      height: 5rem;
      grid-template-areas: "logo menu search user";
      grid-template-columns: 263px auto 4.3rem 5rem;
    }

    .link-home {
      position: static;
      display: flex;
      padding: 0 10px;
      align-items: center;
      transform: translate(0, 0);
    }

    .ia-logo,
    .ia-wordmark {
      display: inline-block;
      vertical-align: middle;
    }

    .ia-wordmark {
      margin-left: 1rem;
    }

    .hamburger {
      display: none;
    }
  }
`;
