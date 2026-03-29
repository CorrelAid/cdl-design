export interface Locale {
    code: string;
    label: string;
}
interface Props {
    locales: Locale[];
    currentLocale: string;
    onLocaleChange: (locale: string) => void;
}
declare const LanguageSwitcher: import("svelte").Component<Props, {}, "">;
type LanguageSwitcher = ReturnType<typeof LanguageSwitcher>;
export default LanguageSwitcher;
