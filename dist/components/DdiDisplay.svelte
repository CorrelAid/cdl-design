<script lang="ts">
    import { codeToHtml } from "shiki";

    interface Props {
        ddiXml: string;
        title?: string;
        copyLabel?: string;
        copiedLabel?: string;
    }

    let {
        ddiXml,
        title = 'DDI Codebook',
        copyLabel = 'Copy',
        copiedLabel = 'Copied!'
    }: Props = $props();

    let highlightedHtml = $state("");
    let copied = $state(false);

    $effect(() => {
        codeToHtml(ddiXml.trim(), { lang: "xml", theme: "github-light" }).then(html => {
            highlightedHtml = html;
        });
    });

    async function copyXml() {
        await navigator.clipboard.writeText(ddiXml.trim());
        copied = true;
        setTimeout(() => { copied = false; }, 2000);
    }
</script>

<div class="qt-card">
    <div class="qt-card-header">
        <span class="qt-sheet-tab">{title}</span>
        <button class="qt-copy-btn" onclick={copyXml}>
            {copied ? copiedLabel : copyLabel}
        </button>
    </div>
    <div class="qt-card-body">
        {#if highlightedHtml}
            {@html highlightedHtml}
        {:else}
            <pre>{ddiXml.trim()}</pre>
        {/if}
    </div>
</div>

<style>
    .qt-card {
        background: var(--color-white);
        border: var(--dimension-border-width) solid var(--color-text-primary);
        border-radius: var(--radius-lg);
        overflow: hidden;
    }

    .qt-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-xs) var(--spacing-base);
        border-bottom: var(--dimension-border-width) solid var(--color-text-primary);
    }

    .qt-sheet-tab {
        font-weight: var(--font-weight-semibold);
        font-size: 0.9rem;
        color: var(--color-text-primary);
    }

    .qt-copy-btn {
        padding: 0.2rem 0.6rem;
        background: none;
        border: 1.5px solid var(--color-text-primary);
        border-radius: var(--radius-sm);
        color: var(--color-text-primary);
        font-size: 0.75rem;
        font-family: var(--font-family-body);
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.15s;
    }

    .qt-copy-btn:hover {
        opacity: 1;
    }

    .qt-card-body {
        overflow-x: auto;
    }

    .qt-card-body :global(pre) {
        margin: 0;
        border-radius: 0;
        padding: var(--spacing-base);
    }
</style>
