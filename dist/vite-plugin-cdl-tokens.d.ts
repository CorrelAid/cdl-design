import type { Plugin } from 'vite';
export interface CdlTokensOptions {
    /** Directory to write generated CSS into. Defaults to `src/lib/styles` */
    outDir?: string;
    /** CSS filename. Defaults to `gen_tokens.css` */
    filename?: string;
}
/**
 * Vite plugin that compiles the CDL design tokens (DTCG format) into CSS
 * custom properties using Terrazzo.
 *
 * Usage in your vite/astro config:
 *   import { cdlTokens } from '@correlaid/cdl-design/vite-plugin';
 *   export default { plugins: [cdlTokens()] }
 */
export declare function cdlTokens(options?: CdlTokensOptions): Plugin;
