import { css } from 'lit-element';

export default () => {
  return css`
    :host {
      --white: #fff;
      --grey20: #333;
      --grey999: #999;
      --black: #000;
      --link-color: #428bca;
      --primary-text-color: var(--white);
      color: var(--primary-text-color);
      --theme-font-family: 'Helvetica Neue';
      font-size: 1.25rem;
      font-family: var(--theme-font-family);
    }
    button:focus,
    a:focus,
    input:focus {
      outline-color: var(--link-color);
      outline-width: 0.1rem;
      outline-style: auto;
    }
    .flex {
      display: flex;
    }
    .search-inactive {
      display: none;
    }
    .align-center {
      align-items: center;
    }
    .navbar {
      position: relative;
      flex-direction: row;
      padding: 0 1%;
      background: var(--black);
    }
    .navbar button {
      background: none;
      color: inherit;
      border: none;
      font: inherit;
      cursor: pointer;
    }
    .left {
      justify-content: flex-start;
    }
    .right {
      justify-content: flex-end;
    }
    .center {
      margin: auto 3% auto 1%;
      flex: 1;
      justify-content: space-between;
      min-height: 3.75rem;
      max-height: 3.75rem;
    }
    .center .search {
      padding-top: 0;
      margin-right: 1.5%;
    }
    .center .link-home {
      display: block;
      margin: auto;
    }
    .center.search-activated {
      justify-content: center;
      border-radius: 0.6rem 0.6rem 0 0;
      background: var(--grey20);
    }
    .search-activated .highlight,
    .search-activated .search {
      background: var(--white);
      border-radius: 0.6rem;
    }
    .search-activated .highlight {
      display: flex;
      width: 100%;
      margin: 0 1.5%;
    }
    .search-activated .search {
      margin-right: 0;
    }
    .search-activated .search-field {
      width: 100%;
      height: 3rem;
      border-radius: 0.6rem;
      border: none;
      text-align: center;
      font-size: 1.125rem;
    }
    .user-menu {
      padding: 18% 30%;
    }
    .user-menu.active {
      border-radius: 0.6rem 0.6rem 0 0;
      background: var(--grey20);
    }
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .fade-in {
      animation: fade-in 1s forwards;
    }
  `;
};
