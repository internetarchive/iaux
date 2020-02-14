import { css } from 'lit-element';

export default () => {
  return css`
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

    .information-menu {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      padding: 0;
      overflow-x: hidden;
      font-size: 1.4rem;
      background: var(--grey20);
    }

    .menu-slider-offscreen {
      transform: translate(-100%, -100%);
    }

    /* Secondary menu */
    @keyframes menu-enter {
      0% {
        transform: translate(100%, 0);
      }
      100% {
        transform: translate(4rem, 0);
      }
    }
    @keyframes menu-exit {
      0% {
        transform: translate(4rem, 0);
      }
      100% {
        transform: translate(100%, 0);
      }
    }
    .menu-enter {
      animation: menu-enter 0.2s forwards;
    }
    .menu-exit {
      animation: menu-exit 0.2s forwards;
    }

    .info-box {
      padding: 0 1rem;
    }

    .icon-links {
      display: flex;
      align-items: flex-start;
    }

    .icon-links a {
      display: block;
      max-width: 120px;
      margin-bottom: 1.5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .icon-links a + a {
      margin-left: 2rem;
    }
  `;
}
