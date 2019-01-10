An attention-grabbing message indicating something went wrong when using the search engine. This can include user error, like a malformed query, or system error.

![Alert icon with an error message saying that the query had too many words and was rejected](../../../images/search-error-message.png)

## Sub-Components
- [Icon](../tier-1/icon)
- Paragraph

## Do
- Place the error message on its own row/line.
- Ensure there is ample vertical space between the message text and surrounding elements.

## Don’t
- Use this component when the search is actually producing results. Errors should be shown only when the search fails. For advisory information, use the [Search Warning Message](search-warning-message).
- Use any other colors, like red or orange. Error messages should use the standard off-black text color.

## See Also
- [Search Warning Message](search-warning-message)

## TODO
- Potentially generalize Search Messages to create a pattern for all error/warning messages.
