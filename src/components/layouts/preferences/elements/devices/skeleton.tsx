import { Skeleton } from "@mui/material";

export default function Template() {
    return <article className="py-5 flex items-center gap-5 flex-wrap">
    <Skeleton variant="circular" width={48} height={48} />

    <section className="flex-1 flex flex-col gap-1">
        <Skeleton variant="text" width={100} height={20} />

        <Skeleton variant="text" width={100} height={20} />
    </section>

    <Skeleton variant="text" width={100} height={20} />
</article>
}