# Example WebComponent

## Usage

Use this package as a template for creating new WebComponent packages. The
WebComponent can be developed by viewing it directly rendered in index.html
by running `yarn start` or by using Storybook with `yarn storybook`.

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
* /src - place any code for your WebComponent here
* /stories - Storybook setup
* /test - unit tests
