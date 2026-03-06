import { defineConfig, parse, build } from '@terrazzo/parser';
import css from '@terrazzo/plugin-css';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import { createRequire } from 'module';
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
export function cdlTokens(options?: CdlTokensOptions): Plugin {
	const filename = options?.filename ?? 'gen_tokens.css';

	async function compileTokens(outDir: string) {
		// Resolve tokens.json from this package
		const require = createRequire(import.meta.url);
		const tokensJsonPath = require.resolve('@correlaid/cdl-design/tokens.json');
		const tokensUrl = new URL(`file://${tokensJsonPath}`);

		const config = defineConfig(
			{
				plugins: [
					css({
						filename,
						baseSelector: ':root',
						legacyHex: true
					})
				]
			},
			{ cwd: new URL('./', tokensUrl) }
		);

		const tokensSrc = await readFile(tokensJsonPath, 'utf-8');
		const { tokens, sources } = await parse(
			[{ filename: tokensUrl, src: tokensSrc }],
			{ config }
		);
		const result = await build(tokens, { sources, config });

		for (const file of result.outputFiles) {
			const filePath = resolve(outDir, file.filename);
			await mkdir(dirname(filePath), { recursive: true });
			await writeFile(filePath, file.contents, 'utf-8');
		}
	}

	let resolvedOutDir: string;

	return {
		name: 'vite-plugin-cdl-tokens',
		configResolved(config) {
			resolvedOutDir =
				options?.outDir ?? resolve(config.root, 'src/lib/styles');
		},
		async buildStart() {
			console.log('Compiling CDL design tokens...');
			try {
				await compileTokens(resolvedOutDir);
				console.log('CDL design tokens compiled');
			} catch (error) {
				console.error('Failed to compile CDL design tokens:', error);
			}
		},
		async handleHotUpdate({ file, server }) {
			if (file.includes('tokens.json')) {
				console.log('Recompiling CDL design tokens...');
				try {
					await compileTokens(resolvedOutDir);
					console.log('CDL design tokens recompiled');
					server.ws.send({ type: 'full-reload', path: '*' });
				} catch (error) {
					console.error('Failed to recompile CDL design tokens:', error);
				}
			}
		}
	};
}
