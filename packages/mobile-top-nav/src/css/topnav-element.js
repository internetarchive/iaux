import { css } from 'lit-element';

export default () => {
  return css`
    :host {
      --white: #fff;
      --grey13: #222;
      --grey20: #333;
      --grey999: #999;
      --black: #000;
      --link-color: #428bca;
      --primary-text-color: var(--white);
      color: var(--primary-text-color);
      --theme-font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 2rem;
      font-family: var(--theme-font-family);
    }
    button:focus,
    a:focus,
    input:focus {
      outline-color: var(--link-color);
      outline-width: .16rem;
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
      background: var(--grey13);
      border-bottom: 1px solid var(--grey20);
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
      min-height: 6rem;
      max-height: 6rem;
    }
    .center .search {
      padding-top: 0;
      margin-right: 1.5%;
    }
    .link-home {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
    }
    .link-home img {
      height: 32px;
    }
    .search-trigger,
    .search-activated {
      position: relative;
      z-index: 2;
    }
    .search-trigger {
      width: 100%;
      text-align: right;
    }
    .search-activated {
      width: 100%;
      padding: .5rem .2rem;
      border-radius: 0.96rem 0.96rem 0 0;
      background: var(--grey20);
    }
    .search-trigger .search {
      height: 2.8rem;
    }
    .search-activated .highlight,
    .search-activated .search {
      background: var(--white);
      border-radius: 0.96rem;
    }
    .search-activated .highlight {
      display: flex;
      width: 100%;
      margin: 0 1.5%;
    }
    .search-activated .search {
      height: 2.8rem;
      padding: .2rem;
      margin-right: 0;
    }
    .search-activated .search-field {
      width: 100%;
      height: 3rem;
      padding-left: 1rem;
      border-radius: 0.96rem;
      border: none;
      font-size: 1.2rem;
      text-align: center;
    }
    .search-activated .search-field:focus {
      outline: none;
    }
    .user-menu {
      padding: .4rem;
    }
    .user-menu.active {
      border-radius: 0.96rem 0.96rem 0 0;
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
