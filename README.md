# CDL Design

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

### Typography

Import the full fluid type system (requires tokens CSS to be loaded first):

```css
@import '@correlaid/cdl-design/fonts.css';
@import '@correlaid/cdl-design/typography.css';
```

This provides fluid font sizes, heading styles, list styles, blockquote styles, and more — all driven by the design tokens.

### Components

```svelte
<script>
  import { Button, Card } from '@correlaid/cdl-design';
</script>

<Card active>
  <h2>Title</h2>
  <p>Content</p>
</Card>

<Button variant="primary">Click</Button>
<Button variant="secondary" size="lg">Secondary</Button>
<Button variant="ghost" size="sm">Ghost</Button>
```

#### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |

Also accepts all standard `<button>` attributes.

#### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Element ID |
| `active` | `boolean` | `false` | Active state with inset shadow |
| `className` | `string` | `''` | Additional CSS classes |

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

Or in an npm script:

```json
{
  "scripts": {
    "setup": "cp node_modules/@correlaid/cdl-design/dist/favicons/* public/"
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
