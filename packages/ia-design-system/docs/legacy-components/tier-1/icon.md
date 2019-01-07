A single-color icon used to supplement text content or (in rare cases) replace it.

See the [implementation guidelines and list of icons](https://archive.org/help/coding.php) on the live Archive site.

![Info icon: An italic letter "i" inside a dark gray circle](../../../images/icon-info.png)

## Do
- Ensure icon colors have sufficient color contrast against their backgrounds, as you would with type.
- Size icons proportionally to their surrounding text so that they aren't distractingly large or small.
- Use flat colors for icons. Avoid gradients, image textures, or other non-flat colors.

## Don’t
- Allow font icons to be exposed directly to screen readers/assistive technology. When read out, they often use confusing names. Instead, hide them with `aria-hidden` or provide more useful names using adjacent HTML or `aria-label`.

## Caution
- Using icons **in place of** text can be risky. There are very few icons that clearly communicate their meanings without additional text (the search magnifying glass, for example). Whenever possible, include visible text alongside an icon, and use icons only to **supplement** the text or draw attention to it.