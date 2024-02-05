import { cn } from "@/utils/cn";

export default function Pill({
    containerClass, 
    pillClass, 
    children
} : {
    containerClass: string, 
    pillClass: string,
    children: React.ReactNode
}) {
    return <div
        className={ cn('flex items-center gap-2 rounded-full border px-2 py-1 text-xs', containerClass) }
    >
        <div className={ cn('h-2 w-2 rounded-full', pillClass) }></div>

        { children }
    </div>
}