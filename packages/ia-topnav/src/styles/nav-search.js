import { css } from 'lit-element';

export default css`
  input:focus {
    outline: none;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  .search {
    padding-top: 0;
    margin-right: .5rem;
  }
  .search search-image {
    position: relative;
    top: -5px;
    right: -3px;
  }
  .search-activated {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 0;
    right: 5rem;
    bottom: 0;
    left: 5rem;
    z-index: 3;
    padding: 0.5rem 0.2rem;
    border-radius: 1rem 1rem 0 0;
    background: var(--grey20);
  }
  .search-inactive {
    display: none;
  }
  .search-activated .highlight,
  .search-activated .search {
    background: var(--white);
    border-radius: 0.5rem;
  }
  .search-activated .highlight {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    margin: 0 .5rem;
  }
  .search-activated .search {
    height: 100%;
    padding: 0;
    margin-right: 0;
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    align-self: center;
  }
  .search-activated .search-field {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 1rem;
    border-radius: 0.5rem;
    border: none;
    font-size: 1.6rem;
    text-align: center;
  }
  .search-activated .search-field:focus {
    outline: none;
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
    animation: fade-in .2s forwards;
  }

  @media (min-width: 890px) {
    :host {
      float: right;
    }

    .search-inactive,
    .search-activated {
      display: block;
      position: static;
      padding: 1.2rem .2rem;
      background: transparent;
    }

    .search-activated .highlight {
      width: 13rem;
      height: 2.8rem;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: reverse;
      -ms-flex-direction: row-reverse;
      flex-direction: row-reverse;
    }

    .search-activated .search-field {
      width: calc(100% - 28px);
      height: 100%;
      padding-left: 0;
      font-size: 1.4rem;
      text-align: left;
    }

    .search-activated .search svg {
      width: 28px;
      height: 28px;
    }
  }
`;
