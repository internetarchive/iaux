# Zendesk Help Widget Component

## Usage

```html
<ia-zendesk-help-widget
  widgetSrc="https://static.zdassets.com/ekr/snippet.js?key=[zendesk-api-key]"
></ia-zendesk-help-widget>
```

### Properties:

```js
widgetSrc: { type: String }, // widget src
```

### Events

*
    **initiateZenDesk**: Initiate third party script injection

## Testing

Unit tests are placed in the ./test directory with the suffix and extension
".test.js". Any other JS files in the test directory will be ignored by Karma.
Run the tests with `yarn test`.

## Structure

* index.js - main component export
* index.html - file opened when running `yarn start`
* karma.conf.js - Karma runner config
* karma.bs.conf.js - Karma BrowserStack config. Note that BROWSER_STACK_USERNAME
  and BROWSER_STACK_ACCESS_KEY need to be set as environment variables before
  running.
* /src/ia-zendesk-help-widget - main component definition
* /stories - Storybook setup
* /test - unit tests
