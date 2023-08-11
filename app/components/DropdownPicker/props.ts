export interface DropdownSelectProps {
    items: Array<{ label: string; value: string }>;
    placeholder?: string;
    onSelect: (value: string) => void;
}