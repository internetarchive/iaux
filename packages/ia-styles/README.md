![Build Status](https://github.com/internetarchive/iaux-typescript-wc-template/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/internetarchive/iaux-typescript-wc-template/branch/main/graph/badge.svg?token=ZOYRJ2BV9W)](https://codecov.io/gh/internetarchive/iaux-typescript-wc-template)

# ia-styles

This package contains shared styles for Internet Archive web components.

## Installation
```bash
npm i @internetarchive/ia-styles
```

## Usage
```ts
import { iaButtonStyles, iaSronlyStyles } from '@internetarchive/ia-styles';

// Example usage in a LitElement component
import { LitElement, html, css } from 'lit';
import { iaButtonStyles } from '@internetarchive/ia-styles';

class MyComponent extends LitElement {
  static styles = [
    iaButtonStyles,
    css`
      /* Additional styles here */
    `
  ];

  render() {
    return html`
      <button class="ia-button primary">Click me</button>
    `;
  }
}

customElements.define('my-component', MyComponent);
```

## Available Styles

### iaButtonStyles
Styles for buttons.

### iaSronlyStyles
Styles for screen reader only elements.

## Local Demo with `web-dev-server`
```bash
npm run start
```
To run a local development server that serves the basic demo located in `demo/index.html`

## Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
npm run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run
```bash
npm run test:watch
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```

```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```

```bash
npm run format:prettier
```
