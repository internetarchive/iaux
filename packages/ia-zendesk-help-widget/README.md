# `<ia-zendesk-help-widget>`

A Lit web component that lazily loads and opens the Zendesk Help widget on demand. The Zendesk snippet script is only fetched on the first button click, so it has zero impact on page load performance.

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

On the first click the component loads the Zendesk snippet via `LazyLoaderService`, then polls for the widget launcher iframe button and clicks it to open the panel. Subsequent clicks go straight to opening the panel.

## Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `widgetKey` | `String` | `''` | Zendesk Key `ze-snippet` script. |
| `isLoading` | `Boolean` | `false` | True while the snippet is loading. Shows a spinner icon. |
| `buttonVisible` | `Boolean` | `true` | Controls button visibility. Set to `false` once the widget panel opens. |

## Events

| Event | Description |
|---|---|
| `zendeskHelpButtonClicked` | Dispatched when the user clicks the Help button, before the widget opens. |

## CSS custom properties

| Property | Default | Description |
|---|---|---|
| `--buttonBlue` | `#194880` | Button background colour. |
| `--white` | `#fff` | Button text and icon colour. |
| `--iconFillColor` | `var(--white)` | SVG icon fill colour. |
| `--linkColor` | `var(--white)` | Label text colour. |

The button is `108px × 46px` on desktop and collapses to icon-only on viewports narrower than `767px`.

### Example — custom colours

```html
<ia-zendesk-help-widget
  widgetKey="YOUR_KEY"
  style="--buttonBlue: #e03b3b; --iconFillColor: #fff;"
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
