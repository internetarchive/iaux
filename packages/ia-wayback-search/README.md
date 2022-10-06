# Wayback Search Form Component

## Usage

```html
<ia-wayback-search
  .baseHost=${'archive.org'}
  waybackPagesArchived="32 trillion pages"
></ia-wayback-search>
```

```js
document.querySelector('ia-wayback-search').locationHandler = {
  submitCallback: (query) => {
    window.location = `https://web.archive.org/web/*/${query}`;
  }
};
```

### Properties:

```js
baseHost: { type: String }, // host used to build the logo href attribute
locationHandler: { type: Function }, // function called when form submitted. @param url string
waybackPagesArchived: { type: String }, // Pages archived message, e.g. "428 billion pages"
```

### Events

*
    **waybackSearchSubmitted**: form element onsubmit
*
    **waybackMachineStatsLinkClicked**: stats link onclick
*
    **waybackMachineLogoLink**: Wayback logo link onclick

## Testing

Unit tests are placed in the ./test directory with the suffix and extension `.test.js`.
Run the tests with `yarn test`.

We use web-test-runner:
https://modern-web.dev/docs/test-runner/overview/

## Structure

* index.js - main component export
* index.html - file opened when running `yarn start`
* /src/wayback-search.js - main component definition
* /stories - Storybook setup
* /test - unit tests
