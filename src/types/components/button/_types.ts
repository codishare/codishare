export interface ButtonProps {
    children: React.ReactNode,
    className?: string
    onClick?: () => void
    type?: "button" | "submit" | "reset"
    disabled?: boolean
}