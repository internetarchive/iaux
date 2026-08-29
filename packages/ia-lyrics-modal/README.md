# Lyrics Modal

## Description

Uses the https://lyrics.ovh/ API to request a song's lyrics and renders them
in a modal.

## Usage

Artist and song are required before lyrics are requested. If you already know
the artist and song title, you can render the component with them along with
a boolean to determine if you want the modal immediately visible.

```html
<lyrics-modal artist="King Crimson" song="I Talk to the Wind"></lyrics-modal>
```

If, instead, you'd like to pass in an artist and/or song based on user action,
a `load` method on the component is available that accepts an object with
optional properties of `artist` and `song` to update component state. The
method then sets `visible` to true and makes the API call to fetch lyrics.

```javascript
const lyricsModal = document.querySelector('lyrics-modal');

lyricsModal.load({
  artist: 'King Crimson',
  song: 'I Talk to the Wind',
});
```

Clicking the translucent overlay then toggles visibility, allowing the user
to close the modal. You can also programmatically toggle the modal visibility
with `component.show()` and `component.hide()`.

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
