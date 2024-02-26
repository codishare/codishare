import { Skeleton } from "@mui/material"; 

export default function SkeletonUI({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    return <Skeleton className={ className }>{children}</Skeleton>;
}
