# `<ia-zendesk-help-widget>`

A Lit web component that lazily loads and opens the Zendesk Help widget on demand. The Zendesk snippet script is only fetched on the first button click, so it has zero impact on page load performance.

On viewports narrower than 767 px the "Help" label is hidden automatically via CSS, leaving just the icon.

## Installation

```bash
npm install @internetarchive/ia-zendesk-help-widget
```

## Usage

```html
<script type="module">
  import '@internetarchive/ia-zendesk-help-widget';
</script>

<ia-zendesk-help-widget
  widgetKey="YOUR_ZENDESK_KEY"
></ia-zendesk-help-widget>
```

On the first click the component loads the Zendesk snippet via `LazyLoaderService`, waits for the `window.zE` API to initialise, then opens the messenger panel. Subsequent clicks open the panel directly — the script is never fetched twice.

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `widgetKey` | `String` | — | Zendesk account key from the `ze-snippet` URL. **Required.** |

## Events

| Event | Description |
|---|---|
| `zendeskHelpButtonClicked` | Dispatched when the user clicks the Help button, before the widget opens. |

## CSS custom properties

| Property | Default | Description |
|---|---|---|
| `--button-background` | `#194880` | Button background colour. |
| `--button-color` | `#fff` | Button text and icon colour. |
| `--icon-fill-color` | `var(--button-color)` | SVG icon fill colour. |
| `--button-width` | `auto` | Button width. |
| `--button-padding` | `14px 20px` | Button padding. |
| `--button-margin` | `14px 20px` | Margin between button and viewport edges. |
| `--button-top` | `auto` | Distance from the top of the viewport. |
| `--button-bottom` | `0` | Distance from the bottom of the viewport. |
| `--button-left` | `auto` | Distance from the left of the viewport. |
| `--button-right` | `0` | Distance from the right of the viewport. |
| `--button-z-index` | `999998` | Stack order. |
| `--button-border-radius` | `999rem` | Border radius. |
| `--button-font-size` | `14px` | Font size. |
| `--button-font-weight` | `700` | Font weight. |

### Example — custom colours

```html
<ia-zendesk-help-widget
  widgetKey="YOUR_KEY"
  style="
    --button-background: #e03b3b;
    --button-right: 20px;
    --button-bottom: 20px;
  "
></ia-zendesk-help-widget>
```

## Development

```bash
npm install
npm start            # local dev server
npm test             # lint + unit tests
npm run test:watch   # watch mode
npm run format       # auto-fix lint and formatting
```

## Publishing

### Alpha / pre-release

```bash
npm version prerelease --preid=webdev-1234
npm publish --tag alpha
```

### Production

```bash
git checkout -b vX.X.X
git pull --tags
npm version X.X.X
git push --tags
npm publish
```
