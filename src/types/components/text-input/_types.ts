export interface TextInput {
    label?: string;
    icon?: React.ReactNode;
    type?: string;
    value?: any;
    change?: (e: any) => void;
    placeholder?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    ref?: any;
    focus?: () => void;
    blur?: () => void;
    defaultValue?: any
}