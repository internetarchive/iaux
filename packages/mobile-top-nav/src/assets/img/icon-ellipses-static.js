import { html } from 'lit-element';

export default html`
  <svg
    height="40"
    viewBox="0 0 40 40"
    width="40"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="ellipsesTitleID ellipsesDescID"
  >
    <title id="ellipsesTitleID">Ellipses icon</title>
    <desc id="ellipsesDescID">An illustration of text ellipses.</desc>
    <g fill-rule="evenodd" class="fill-color">
      <circle cx="10.769231" cy="19.769231" r="2.769231" />
      <circle cx="20" cy="19.769231" r="2.769231" />
      <circle cx="29.230769" cy="19.769231" r="2.769231" />
    </g>
  </svg>
`;
