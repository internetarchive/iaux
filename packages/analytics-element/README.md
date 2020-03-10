# TrackedElement mixin

## Usage

Please see src/example-component.js for an example of attributes added to
elements and event handlers.

When adding the `TrackedElement` mixin, any element that you would like to track
a click or submit event from needs both a corresponding event listener and
a data attribute that corresponds to the type of event, whether click or submit.
For click events, add the attribute `data-event-click-tracking`, and for submit
add the attribute `data-event-submit-tracking`. In your click or submit event
handlers, call `trackClick` or `trackSubmit`, passing in the event object.
Custom events of the same name will then be fired with the event object
modified as follows:

```
detail: {
  event: 'YourDataAttributeValue'
}
```

## Testing

`yarn test`
