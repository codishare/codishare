'use client'

import { cn } from "@/lib/cn"
import { ButtonProps } from "@/types/components/button/_types"

export default function Button({
    children, 
    ...props
} : ButtonProps) {
    return <button 
        className={cn(
            "bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center gap-3 text-center transition-all",
            props.className
        )}
        onClick={() => props.onClick}
        type={props.type}
        disabled={props.disabled}
    >
        {children}
    </button>
}