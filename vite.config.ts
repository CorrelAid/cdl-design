import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig as defineViteConfig } from 'vite';
import { defineConfig as terrazzoDefineConfig, parse, build } from '@terrazzo/parser';
import css from '@terrazzo/plugin-css';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import type { Plugin } from 'vite';

function compileLocalTokens(): Plugin {
	const tokensPath = resolve('src/lib/tokens/tokens.json');
	const outDir = resolve('src/lib/tokens');

	async function compile() {
		const config = terrazzoDefineConfig(
			{
				plugins: [
					css({
						filename: 'tokens.css',
						baseSelector: ':root',
						legacyHex: true
					})
				]
			},
			{ cwd: new URL(`file://${resolve('.')}/`) }
		);

		const tokensSrc = await readFile(tokensPath, 'utf-8');
		const tokensUrl = new URL(`file://${tokensPath}`);
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

	return {
		name: 'compile-local-tokens',
		async buildStart() {
			await compile();
		},
		async handleHotUpdate({ file, server }) {
			if (file.endsWith('tokens.json')) {
				await compile();
				server.ws.send({ type: 'full-reload', path: '*' });
			}
		}
	};
}

export default defineViteConfig({
	plugins: [compileLocalTokens(), sveltekit()]
});
