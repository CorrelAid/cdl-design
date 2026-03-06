<script lang="ts">
    import { Button, Card, DdiDisplay, Tabs, XlsFormDisplay } from '$lib/index.js';

    const sampleSurvey = [
        { type: "text", name: "respondent_name", "label::en": "What is your name?" },
        { type: "integer", name: "respondent_age", "label::en": "How old are you?" },
        { type: "select_one yes_no", name: "consent", "label::en": "Do you consent to participate?" }
    ];

    const sampleChoices = [
        { list_name: "yes_no", name: "yes", "label::en": "Yes" },
        { list_name: "yes_no", name: "no", "label::en": "No" }
    ];

    const sampleDdi = `<codeBook xmlns="ddi:codebook:2_5">
  <stdyDscr>
    <citation>
      <titlStmt>
        <titl>Sample Survey 2024</titl>
      </titlStmt>
    </citation>
  </stdyDscr>
  <var name="respondent_age" intrvl="contin">
    <labl>How old are you?</labl>
    <varFormat type="numeric" />
    <sumStat type="min">18</sumStat>
    <sumStat type="max">99</sumStat>
  </var>
</codeBook>`;

    const sampleTabs = [
        { title: "Overview", content: "<p>This is the <strong>overview</strong> tab with some introductory content.</p>" },
        { title: "Details", content: "<p>Here are the <em>details</em>. This tab has more information about the topic at hand.</p><ul><li>Point one</li><li>Point two</li><li>Point three</li></ul>" },
        { title: "Code", content: "<pre><code>const x = 42;\nconsole.log(x);</code></pre>" }
    ];
</script>

<div class="showcase">
    <h1>CDL Design System</h1>
    <p>Component showcase and design token reference.</p>

    <!-- Colors -->
    <section>
        <h2>Colors</h2>
        <div class="color-swatches">
            <div class="swatch" style:background-color="var(--color-primary)">
                <span>primary</span>
            </div>
            <div class="swatch" style:background-color="var(--color-primary-darker)">
                <span>primary-darker</span>
            </div>
            <div class="swatch" style:background-color="var(--color-secondary)">
                <span>secondary</span>
            </div>
            <div class="swatch" style:background-color="var(--color-tertiary)">
                <span>tertiary</span>
            </div>
            <div class="swatch" style:background-color="var(--color-text-primary)">
                <span>text-primary</span>
            </div>
            <div class="swatch" style:background-color="var(--color-white)">
                <span>white</span>
            </div>
        </div>
    </section>

    <!-- Typography -->
    <section>
        <h2>Typography</h2>
        <h1>Heading 1 — PP Fraktion Sans</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <p>Body text using Inter. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <blockquote>This is a blockquote with italic styling and a left border.</blockquote>
        <small>Small text for captions and metadata</small>
        <p class="label">Label text</p>
        <pre><code>Monospace text — PP Fraktion Mono</code></pre>
    </section>

    <!-- Button -->
    <section>
        <h2>Button</h2>
        <div class="component-grid">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
        </div>
        <h4>Sizes</h4>
        <div class="component-grid">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
        <h4>Disabled</h4>
        <div class="component-grid">
            <Button disabled>Disabled</Button>
        </div>
    </section>

    <!-- Card -->
    <section>
        <h2>Card</h2>
        <div class="component-grid">
            <Card>
                <h3>Default Card</h3>
                <p>Card content goes here.</p>
            </Card>
            <Card active>
                <h3>Active Card</h3>
                <p>This card has the active state.</p>
            </Card>
        </div>
    </section>

    <!-- Tabs -->
    <section>
        <h2>Tabs</h2>
        <Tabs tabs={sampleTabs} />
    </section>

    <!-- XlsFormDisplay -->
    <section>
        <h2>XlsFormDisplay</h2>
        <XlsFormDisplay survey={sampleSurvey} choices={sampleChoices} />
    </section>

    <!-- DdiDisplay -->
    <section>
        <h2>DdiDisplay</h2>
        <DdiDisplay ddiXml={sampleDdi} />
    </section>

    <!-- Spacing -->
    <section>
        <h2>Spacing Scale</h2>
        <table class="token-table">
            <tbody>
                {#each ['2xs', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'] as size}
                    <tr>
                        <td>--spacing-{size}</td>
                        <td>
                            <div style="height: 12px; background: var(--color-secondary); width: var(--spacing-{size}); border-radius: 2px;"></div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </section>

    <!-- Radius -->
    <section>
        <h2>Border Radius</h2>
        <div class="component-grid">
            {#each ['sm', 'base', 'md', 'lg', 'xl', '2xl', 'full'] as r}
                <div style="
                    width: 60px; height: 60px;
                    background: var(--color-secondary);
                    border-radius: var(--radius-{r});
                    display: flex; align-items: center; justify-content: center;
                    color: var(--color-text-secondary); font-size: 0.7rem; font-family: var(--font-family-mono);
                ">{r}</div>
            {/each}
        </div>
    </section>
</div>
