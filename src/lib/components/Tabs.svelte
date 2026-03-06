<script lang="ts">
    interface Tab {
        title: string;
        content: string;
    }

    interface Props {
        tabs: Tab[];
        activeTab?: number;
        expandLabel?: string;
        collapseLabel?: string;
    }

    let {
        tabs,
        activeTab = 0,
        expandLabel = 'Show more',
        collapseLabel = 'Show less'
    }: Props = $props();

    let currentTab = $state(0);

    $effect(() => {
        currentTab = activeTab;
    });
    let expanded = $state(false);
    let panelEl: HTMLDivElement | undefined = $state();
    let firstTabHeight = $state(0);
    let needsExpand = $state(false);

    function setTab(index: number) {
        currentTab = index;
        expanded = false;
    }

    $effect(() => {
        currentTab;
        requestAnimationFrame(() => {
            if (!panelEl) return;
            const height = panelEl.scrollHeight;
            if (currentTab === 0) {
                firstTabHeight = height;
            }
            needsExpand = firstTabHeight > 0 && height > firstTabHeight + 20;
        });
    });
</script>

<div class="tabs-wrapper">
    <div class="tabs-bar" role="tablist">
        {#each tabs as tab, index}
            <button
                class="tab-button"
                class:active={currentTab === index}
                role="tab"
                aria-selected={currentTab === index}
                aria-controls="tabpanel-{index}"
                onclick={() => setTab(index)}
            >
                {tab.title}
            </button>
        {/each}
    </div>
    <hr class="tab-rule" />
    <div
        class="panel-collapsible"
        class:collapsed={!expanded && needsExpand}
        style:max-height={!expanded && needsExpand ? `${firstTabHeight}px` : 'none'}
        style:min-height={firstTabHeight > 0 ? `${firstTabHeight}px` : 'auto'}
    >
        <div
            bind:this={panelEl}
            class="tab-panel"
            role="tabpanel"
            id="tabpanel-{currentTab}"
        >
            {@html tabs[currentTab].content}
        </div>
    </div>
    <button class="expand-button" class:hidden={!needsExpand} onclick={() => { expanded = !expanded; }}>
        {expanded ? collapseLabel : expandLabel}
    </button>
</div>

<style>
    .tabs-wrapper {
        margin: var(--spacing-lg) 0;
    }

    .tabs-bar {
        display: flex;
        gap: var(--spacing-lg);
        overflow-x: auto;
    }

    .tab-rule {
        border: none;
        border-top: var(--dimension-border-width) solid var(--color-text-primary);
        margin: 0 0 var(--spacing-base);
        opacity: 0.3;
    }

    .tab-button {
        padding: var(--spacing-xs) 0;
        border: none;
        background: transparent;
        cursor: pointer;
        font-family: var(--font-family-body);
        font-size: 1rem;
        color: var(--color-text-primary);
        white-space: nowrap;
        opacity: 0.5;
        border-bottom: 2px solid transparent;
        margin-bottom: -1.5px;
        transition: opacity 0.15s ease;
    }

    .tab-button:hover {
        opacity: 0.8;
    }

    .tab-button.active {
        opacity: 1;
        font-weight: var(--font-weight-semibold);
        border-bottom-color: var(--color-text-primary);
    }

    .tab-panel {
        overflow-x: auto;
    }

    .tab-panel :global(pre) {
        margin: 0;
        border-radius: var(--radius-lg);
        overflow-x: auto;
    }

    .panel-collapsible {
        overflow: hidden;
        position: relative;
    }

    .panel-collapsible.collapsed::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: linear-gradient(to bottom, transparent, var(--color-background));
        pointer-events: none;
    }

    .expand-button {
        display: block;
        width: 100%;
        padding: var(--spacing-xs) 0;
        border: none;
        background: transparent;
        cursor: pointer;
        font-family: var(--font-family-body);
        font-size: 0.9rem;
        color: var(--color-text-primary);
        opacity: 0.6;
        transition: opacity 0.15s ease;
        text-align: center;
    }

    .expand-button.hidden {
        visibility: hidden;
    }

    .expand-button:hover {
        opacity: 1;
    }
</style>
