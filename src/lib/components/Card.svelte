<script lang="ts">
    interface Props {
        id?: string;
        active?: boolean;
        className?: string;
        children?: any;
    }

    let { id, active = false, className = '', children }: Props = $props();
</script>

<div
    {id}
    class={`card ${className} ${active ? 'active' : ''}`}
>
    {@render children?.()}
</div>

<style>
    .card {
        background-color: var(--color-secondary);
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        position: relative;
        color: var(--color-text-secondary, #fff);
    }

    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .card.active {
        box-shadow: inset -8px 0 0 0 white, 0 4px 8px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }
</style>
