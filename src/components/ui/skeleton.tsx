import { Skeleton } from "@mui/material";
import { cn } from "@/utils/cn";

export default function SkeletonUI({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    return <Skeleton className={cn("p-3", className)}>{children}</Skeleton>;
}
