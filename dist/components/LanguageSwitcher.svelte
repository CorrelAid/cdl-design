<script lang="ts">
	export interface Locale {
		code: string;
		label: string;
	}

	interface Props {
		locales: Locale[];
		currentLocale: string;
		onLocaleChange: (locale: string) => void;
	}

	let { locales, currentLocale, onLocaleChange }: Props = $props();
</script>

<div class="lang-switcher">
	{#each locales as locale, index (locale.code)}
		<button
			class:active={currentLocale === locale.code}
			class:first={index === 0}
			class:last={index === locales.length - 1}
			onclick={() => onLocaleChange(locale.code)}
		>
			{locale.label}
		</button>
	{/each}
</div>

<style>
	.lang-switcher {
		display: flex;
		justify-content: flex-end;
		gap: 0;
		padding: 0;
	}

	.lang-switcher button {
		background: var(--color-white, #fff);
		border: 1px solid var(--color-text-primary);
		padding: 0.35rem 0.75rem;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-text-primary);
		border-radius: 0;
	}

	.lang-switcher button.first {
		border-radius: 4px 0 0 4px;
		border-right: none;
	}

	.lang-switcher button.last {
		border-radius: 0 4px 4px 0;
	}

	.lang-switcher button:not(.first):not(.last) {
		border-right: none;
	}

	.lang-switcher button:hover {
		background: #f0ecf0;
	}

	.lang-switcher button.active {
		background: var(--color-text-primary);
		color: var(--color-white, #fff);
		font-weight: 600;
	}
</style>
