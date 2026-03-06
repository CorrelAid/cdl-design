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
declare const Tabs: import("svelte").Component<Props, {}, "">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
