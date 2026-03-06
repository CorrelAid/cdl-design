<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';

    interface Props extends HTMLButtonAttributes {
        variant?: 'primary' | 'secondary' | 'ghost';
        size?: 'sm' | 'md' | 'lg';
        children: Snippet;
    }

    let { variant = 'primary', size = 'md', children, ...rest }: Props = $props();
</script>

<button class="btn btn-{variant} btn-{size}" {...rest}>
    {@render children()}
</button>

<style>
    .btn {
        font-family: var(--font-family-body);
        font-weight: var(--font-weight-medium);
        border: none;
        border-radius: var(--radius-md);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s ease;
    }

    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Sizes */
    .btn-sm {
        padding: var(--spacing-2xs) var(--spacing-xs);
    }
    .btn-md {
        padding: var(--spacing-xs) var(--spacing-base);
    }
    .btn-lg {
        padding: var(--spacing-sm) var(--spacing-lg);
    }

    /* Variants */
    .btn-primary {
        background-color: var(--color-primary);
        color: var(--color-text-primary);
    }
    .btn-primary:hover:not(:disabled) {
        background-color: var(--color-primary-darker);
    }

    .btn-secondary {
        background-color: var(--color-secondary);
        color: var(--color-text-secondary);
    }
    .btn-secondary:hover:not(:disabled) {
        opacity: 0.9;
    }

    .btn-ghost {
        background-color: transparent;
        color: var(--color-text-primary);
        border: var(--dimension-border-width) solid var(--color-text-primary);
    }
    .btn-ghost:hover:not(:disabled) {
        background-color: var(--color-primary);
    }
</style>
