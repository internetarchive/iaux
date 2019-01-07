## Visual Design Principles

### Typography is clear and classical
Type should call to mind the idea of a placard at a museum.

### Categorized, clean, complete
The underlying database of archived information is available to users. Data is clean and complete, with tabular structures that clearly represent relationships between keys and values.

### Fluid grid and vertical rhythm
Layout is predictable and consistent. The grid is geometric and rational, but also responsive to the changing needs of devices and users.

### Touchable
Interactive elements feature slightly rounded corners that invite users to touch.

### Breathing room
Elements are allowed to float in space and need not be constrained within a container.

### Imagery and icons are distilled down to their purest form
Not ornamental. Think of signage at a museum.

---------------

## Typography
For millennia humans have recorded knowledge through the written word. A clear expression of knowledge through readable, legible typography is key to the Internet Archive’s mission.

### Fonts
Our preferred font for all type is **Neue Helvetica**, because of its clean, unassuming character, its grotesque Swiss efficiency, its wide use in museum contexts, and its range of weights.

However, we embrace the fluidity of the Web and the fact that many users will experience our site using devices with different available fonts. Our complete font stack attempts to capture the key benefits of Neue Helvetica with regular Helvetica and Microsoft’s Helvetica imitator, Arial, before falling back to the default browser sans-serif:
- Neue Helvetica
- Helvetica
- Arial
- sans-serif default font (could be Arial, Roboto, etc.)

### Type Scale
New designs should use the following modular type scale. It’s inspired by the font sizes used in our older designs, though it tweaks some of the sizes to match the scale more accurately.

The scaling factor is 1.333.

- 12px
- 16px
- 21.333px
- 28.444px
- 37.926px
- 50.568px

See the [Type Scale component](../components/detail/type-scale/) for a visual representation.

In the legacy design, the default font size is 14px, but in newer designs text should be 16px or larger whenever possible for better readability.

**NOTE:** While sizes are listed here as their computedp pixel values for reference, all type should be sized with relative units in CSS (`rem`s and `em`s, for example) to allow them to change size based on user preference.

**TODO:** Add code guidelines for using `rem`s and `em`s.

### Leading
The default `line-height` in CSS should be `1.5`, which comes out to 24px when the `font-size` is 16px. *(This value is very new and not in use in very many places)*

However, in older designs the `line-height` is set to `1.4285714286`, which comes out to 20px when the `font-size` is 14px.

When setting a custom `line-height`, try to make the value come out to a multiple or half-step of the base `line-height`. So if the base is 24px, aim for 48px, 36px, or 12px.

### Weights
We currently do not have guidelines for font weights.

---------------

## Spacing
Currently, as a result of the 20px default line height, spacing should be a multiple of 20px or 10px whenever possible. This rule is not followed consistently, however, and may be subject to change as the design system evolves.

---------------

## Color
Type is <span style="background-color: #333333; color: white;">#333333 (dark gray)</span> by default.

Links are <span style="background-color: #428bca; color: white;">#428bca (light blue)</span>. This color does not meet accessibility requirements and needs to be updated in the near future.

Stick to grayscale for most elements. Links and some other interactive elements may use the link blue (above).

All text should have at least AA WCAG contrast against its background, and ideally should have AAA contrast. This includes text that might otherwise be faint, like placeholders in text inputs or grayed out (disabled) controls.
