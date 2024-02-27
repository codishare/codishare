export interface InputProps {
    type?: string;
    placeholder?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    initialValue?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    id?: string;
    name?: string;
}