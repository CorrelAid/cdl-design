<script lang="ts">
    interface Worksheet {
        id?: string;
        title: string;
        headers: string[];
        data: string[][];
    }

    interface Props {
        worksheets?: Worksheet[];
        survey?: Record<string, string>[];
        choices?: Record<string, string>[];
    }

    let { worksheets, survey, choices }: Props = $props();

    let sheets = $derived.by(() => {
        if (worksheets) return worksheets;

        const result: Worksheet[] = [];
        if (survey?.length) {
            const headers = [...new Set(survey.flatMap(r => Object.keys(r)))];
            const data = survey.map(row => headers.map(h => row[h] ?? ""));
            result.push({ title: "survey", headers, data });
        }
        if (choices?.length) {
            const headers = [...new Set(choices.flatMap(r => Object.keys(r)))];
            const data = choices.map(row => headers.map(h => row[h] ?? ""));
            result.push({ title: "choices", headers, data });
        }
        return result;
    });

    let copiedIndex = $state<number | null>(null);

    function sheetToTsv(sheet: Worksheet): string {
        const headerLine = sheet.headers.join("\t");
        const dataLines = sheet.data.map(row => row.join("\t")).join("\n");
        return `${headerLine}\n${dataLines}`;
    }

    async function copySheet(index: number) {
        await navigator.clipboard.writeText(sheetToTsv(sheets[index]));
        copiedIndex = index;
        setTimeout(() => { copiedIndex = null; }, 2000);
    }
</script>

{#each sheets as sheet, i (sheet.title)}
    <div class="qt-card">
        <div class="qt-card-header">
            <span class="qt-sheet-tab">{sheet.title}</span>
            <button class="qt-copy-btn" onclick={() => copySheet(i)}>
                {copiedIndex === i ? "Copied!" : "Copy"}
            </button>
        </div>
        <div class="qt-card-body">
            <table class="qt-table">
                <thead>
                    <tr>
                        {#each sheet.headers as header (header)}
                            <th>{header}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each sheet.data as row, ri (ri)}
                        <tr>
                            {#each row as cell, ci (ci)}
                                <td>{cell}</td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
{/each}

<style>
    .qt-card {
        background: var(--color-white);
        border: var(--dimension-border-width) solid var(--color-text-primary);
        border-radius: var(--radius-lg);
        overflow: hidden;
        margin-bottom: var(--spacing-base);
    }

    .qt-card:last-child {
        margin-bottom: 0;
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

    .qt-table {
        width: 100%;
        border-collapse: collapse;
        margin: 0;
    }

    .qt-table th {
        padding: var(--dimension-table-padding);
        text-align: left;
        font-family: var(--font-family-mono);
        font-weight: var(--font-weight-medium);
        font-size: 0.9rem;
        color: var(--color-text-primary);
        background: transparent;
        border-bottom: var(--dimension-border-width) solid var(--color-text-primary);
    }

    .qt-table td {
        padding: var(--dimension-table-padding);
        font-size: 0.9rem;
        color: var(--color-text-primary);
        background: var(--color-white);
        border: none;
        border-bottom: 1px solid rgba(134, 24, 95, 0.12);
    }

    .qt-table tbody tr:last-child td {
        border-bottom: none;
    }
</style>
