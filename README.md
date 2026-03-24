# CDL Design

[![AI-Assisted](https://img.shields.io/badge/AI--assisted-Claude%20Code-blueviolet?logo=anthropic&logoColor=white)](./AI_DISCLOSURE.md)

Shared design tokens, components, fonts, and favicons for CDL projects.

## Install

```sh
npm install git+ssh://git@github.com:CorrelAid/cdl-design.git
```

Or in `package.json`:

```json
{
  "dependencies": {
    "@correlaid/cdl-design": "git+ssh://git@github.com:CorrelAid/cdl-design.git"
  }
}
```

The package builds itself on install via the `prepare` script.

## Usage

### Design tokens (Terrazzo Vite plugin)

The package includes a Vite plugin that compiles `tokens.json` into CSS custom properties using Terrazzo. Add it to your Vite or Astro config:

```js
// astro.config.mjs
import { cdlTokens } from '@correlaid/cdl-design/vite-plugin';

export default defineConfig({
  vite: {
    plugins: [cdlTokens()]
  }
});
```

```js
// vite.config.ts (SvelteKit or plain Vite)
import { cdlTokens } from '@correlaid/cdl-design/vite-plugin';

export default defineConfig({
  plugins: [cdlTokens()]
});
```

This writes `gen_tokens.css` into `src/lib/styles/` by default. You can customize the output:

```js
cdlTokens({
  outDir: 'src/styles',      // output directory
  filename: 'tokens.css'     // output filename
})
```

Then import the generated file in your CSS:

```css
@import './gen_tokens.css';
```

### Tokens (raw JSON)

If you need the raw token values in JS/TS:

```ts
import { tokens } from '@correlaid/cdl-design';
// or
import tokens from '@correlaid/cdl-design/tokens.json';
```

### Fonts

Import the font-face declarations to register PP Fraktion Sans and PP Fraktion Mono:

```css
@import '@correlaid/cdl-design/fonts.css';
```

For Inter, install `@fontsource-variable/inter` separately since it's available on npm.

### Typography (fluid type system)

The package includes a fluid typography system that scales font sizes smoothly between a minimum and maximum viewport width. It uses CSS `clamp()` driven entirely by design tokens — no media queries needed.

#### How it works

The `tokens.json` defines font sizes as **unitless min/max pairs** (in px):

```json
"fontSize": {
  "h1-min": { "$type": "number", "$value": 30 },
  "h1-max": { "$type": "number", "$value": 40 }
}
```

The `fluid` tokens control the viewport range:

```json
"fluid": {
  "from-screen": { "$type": "number", "$value": 400 },
  "to-screen":   { "$type": "number", "$value": 1200 }
}
```

The typography CSS then computes a linear interpolation between min and max sizes using `clamp()`:

```
font-size: clamp(min-size, fluid-size, max-size)
```

At **400px** viewport, headings/body/etc. use their `*-min` size. At **1200px**, they reach their `*-max` size. In between, they scale linearly.

#### Setup

Import fonts, generated tokens, and the typography stylesheet. Order matters:

```css
/* 1. Token-generated CSS custom properties */
@import './gen_tokens.css';

/* 2. Font faces + fluid typography rules */
@import '@correlaid/cdl-design/fonts.css';
@import '@correlaid/cdl-design/typography.css';
```

This gives you styled `h1`–`h6`, `p`, `ul`/`ol`/`li`, `blockquote`, `small`, `code`/`pre`, `table`, `strong`/`em`, and utility classes (`.caption`, `.label`, `.text-small`, `.mono`, `.mono-strong`).

#### What's included

| Element / Class | Tokens used | Notes |
|---|---|---|
| `body` | `body-min`/`body-max` | Sets base font, line-height, letter-spacing |
| `h1` | `h1-min`/`h1-max` | PP Fraktion Sans, bold, tight line-height |
| `h2` | `h2-min`/`h2-max` | Bold, snug line-height |
| `h3` | `h3-min`/`h3-max` | Bold, snug line-height |
| `h4`, `h5`, `h6` | `h4-min`/`h4-max` | Semibold |
| `p` | `body-min`/`body-max` | Max-width: `--dimension-content-prose-width` |
| `li` | `list-min`/`list-max` | Flex column layout with gap |
| `blockquote` | `blockquote-min`/`blockquote-max` | Italic, left border |
| `small`, `.text-small` | `small-min`/`small-max` | PP Fraktion Sans, light weight |
| `.caption` | `caption-min`/`caption-max` | Wide letter-spacing |
| `.label` | `label-min`/`label-max` | Uppercase, wider tracking |
| `code`, `pre`, `.mono` | `mono-min`/`mono-max` | PP Fraktion Mono |

#### Using fluid sizes in custom components

To apply fluid sizing to your own elements, set `--min-size` and `--max-size` and include the element in the fluid selector, or apply the clamp pattern directly:

```css
.my-element {
    --min-size: var(--font-size-body-min);
    --max-size: var(--font-size-body-max);

    --rise: calc(var(--max-size) - var(--min-size));
    --slope: calc(var(--rise) / var(--fluid-run));
    --min-size-px: calc(var(--min-size) * 1px);
    --max-size-px: calc(var(--max-size) * 1px);
    --fluid-size-px: calc(
        var(--slope) * (100vw - var(--fluid-from-screen-px)) + var(--min-size-px)
    );

    font-size: clamp(var(--min-size-px), var(--fluid-size-px), var(--max-size-px));
}
```

Or simply set the variables if your element already matches one of the typography selectors (`p`, `li`, `h1`–`h6`, etc.):

```css
.intro-text {
    --min-size: var(--font-size-h3-min);
    --max-size: var(--font-size-h3-max);
}
```

### Components

```svelte
<script>
  import { Button, Card, Tabs, XlsFormDisplay, DdiDisplay } from '@correlaid/cdl-design';
</script>
```

#### Button

```svelte
<Button variant="primary">Click</Button>
<Button variant="secondary" size="lg">Secondary</Button>
<Button variant="ghost" size="sm" disabled>Ghost</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |

Also accepts all standard `<button>` attributes.

#### Card

```svelte
<Card active>
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | — | Element ID |
| `active` | `boolean` | `false` | Active state with inset shadow |
| `className` | `string` | `''` | Additional CSS classes |

#### Tabs

Collapsible tabbed content panel. Content is passed as HTML strings.

```svelte
<Tabs tabs={[
  { title: 'Overview', content: '<p>First tab</p>' },
  { title: 'Details', content: '<p>Second tab</p>' }
]} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `{ title: string; content: string }[]` | required | Tab definitions |
| `activeTab` | `number` | `0` | Initially active tab index |
| `expandLabel` | `string` | `'Show more'` | Expand button text |
| `collapseLabel` | `string` | `'Show less'` | Collapse button text |

If the active tab's content is taller than the first tab, an expand/collapse button appears automatically.

#### XlsFormDisplay

Renders XLSForm worksheets as tables, each sheet in its own card with a copy-to-clipboard button (copies as TSV).

```svelte
<!-- From survey/choices arrays -->
<XlsFormDisplay
  survey={[
    { type: 'text', name: 'name', 'label::en': 'Your name?' },
    { type: 'integer', name: 'age', 'label::en': 'Your age?' }
  ]}
  choices={[
    { list_name: 'yes_no', name: 'yes', 'label::en': 'Yes' },
    { list_name: 'yes_no', name: 'no', 'label::en': 'No' }
  ]}
/>

<!-- Or from pre-built worksheets -->
<XlsFormDisplay worksheets={[
  { title: 'survey', headers: ['type', 'name'], data: [['text', 'q1']] }
]} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `worksheets` | `Worksheet[]` | — | Pre-built sheet data |
| `survey` | `Record<string, string>[]` | — | Survey rows (auto-converted) |
| `choices` | `Record<string, string>[]` | — | Choice rows (auto-converted) |

Pass either `worksheets` or `survey`/`choices` — not both.

#### DdiDisplay

Displays DDI XML with Shiki syntax highlighting and a copy button. Requires `shiki` as a peer dependency.

```svelte
<DdiDisplay ddiXml={xmlString} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `ddiXml` | `string` | required | DDI XML source |
| `title` | `string` | `'DDI Codebook'` | Header label |
| `copyLabel` | `string` | `'Copy'` | Copy button text |
| `copiedLabel` | `string` | `'Copied!'` | Text after copying |

### Favicons

Copy favicons from the package into your project's public/static directory. The files are available at:

```
node_modules/@correlaid/cdl-design/dist/favicons/
  favicon.svg
  favicon.png
  favicon-32x32.png
  apple-touch-icon.png
```

You can copy them with a script or reference them directly:

```sh
# Copy to your static/public directory
cp node_modules/@correlaid/cdl-design/dist/favicons/* public/
```

Or automatically after every install via `postinstall` (with a guard for first-install timing):

```json
{
  "scripts": {
    "postinstall": "[ -d node_modules/@correlaid/cdl-design/dist/favicons ] && cp node_modules/@correlaid/cdl-design/dist/favicons/* public/ || true"
  }
}
```

Then reference in your HTML `<head>`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

## Development

```sh
npm install
npm run dev       # dev server with preview app
npm run package   # build dist + run publint
npm run check     # type check
```

### Keeping `dist/` in sync

Because bun doesn't run `prepare` scripts for git-installed packages, the built `dist/` directory is committed to the repo. A local **pre-commit hook** rebuilds it automatically before every commit:

```sh
# .git/hooks/pre-commit
npm run prepare && git add dist/
```

If you clone fresh and the hook is missing, recreate it:

```sh
printf '#!/bin/sh\nnpm run prepare && git add dist/\n' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```
