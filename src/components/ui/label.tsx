'use client'

import { cn } from "@/lib/cn"
import { LabelProps } from "@/types/components/label/_types"

export default function Label({
    children,
    ...props
} : LabelProps ) {
    return <label className={
        cn(
            "flex flex-col gap-2 cursor-pointer",
            props.className
        )
    }>
        <span className="text-sm text-gray-600 flex items-center gap-1">
            {props.label}{" "}
            {props.required && (
                <span className="text-red-500 text-xl">*</span>
            )}
        </span>

        {children}
    </label>
}