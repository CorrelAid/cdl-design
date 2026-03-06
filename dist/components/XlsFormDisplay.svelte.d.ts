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
declare const XlsFormDisplay: import("svelte").Component<Props, {}, "">;
type XlsFormDisplay = ReturnType<typeof XlsFormDisplay>;
export default XlsFormDisplay;
