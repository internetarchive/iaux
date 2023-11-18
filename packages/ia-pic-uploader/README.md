![Build Status](https://github.com/internetarchive/iaux-typescript-wc-template/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/internetarchive/iaux-typescript-wc-template/branch/main/graph/badge.svg?token=ZOYRJ2BV9W)](https://codecov.io/gh/internetarchive/iaux-typescript-wc-template)

# <ia-pic-uploader></ia-pic-uploader>

This is the Profile Pic Uploader Component for Internet Archive website.

## Installation
```bash
yarn add @internetarchive/ia-pic-uploader
```

## Usage of ia-pic-uploader
```ts
import '@internetarchive/ia-pic-uploader';


<div id="demo"></div>

<ia-pic-uploader>
</ia-pic-uploader>

<script type="module">
    import { html, render } from 'lit';
    import '../dist/src/ia-pic-uploader.js';

    render(
      html`
        <ia-pic-uploader></ia-pic-uploader>
      `,
      document.querySelector('#demo')
    );

    const iaPicUploader = document.querySelector('ia-pic-uploader');

    iaPicUploader.identifier = 'naturalhistoryof00unse_4111';
    iaPicUploader.endpoint = 'https://www-neeraj.archive.org/services/post-file.php';
    iaPicUploader.picture = './demo/default-preview.jpg' ;
    iaPicUploader.type = 'full'; // full|compact
    iaPicUploader.lookingAtMyAccount = true;
    iaPicUploader.maxFileSizeInMB = 4; //
    iaPicUploader.validFileTypes = ['image/jpeg','image/png','image/gif'];
  </script>
```
## Variants 

1. <ia-pic-uploader type="full"></ia-pic-uploader>
2. <ia-pic-uploader type="compact"></ia-pic-uploader>

## Attribute 
1. **identifier** - User identifier.
2. **endpoint** - Endpoint of form submition in case of full variant.
3. **picture** - User profile picture. 
4. **type** - Web component type full | compact.
5. **lookingAtMyAccount** - User looking at it's own account
6. **maxFilesSizeInMB** - File's max-size
7. **validFileTypes** - File's valid types

## Local Demo with `web-dev-server`
```bash
yarn start
```
To run a local development server that serves the basic demo located in `demo/index.html`

## Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
yarn run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run
```bash
yarn run test:watch
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
yarn run lint
```

You can lint with ESLint and Prettier individually as well
```bash
yarn run lint:eslint
```

```bash
yarn run lint:prettier
```

To automatically fix many linting errors, run
```bash
yarn run format
```

You can format using ESLint and Prettier individually as well
```bash
yarn run format:eslint
```

```bash
yarn run format:prettier
```