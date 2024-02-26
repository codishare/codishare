'use client'

import { useSession } from "@/lib/hooks/useSession";
import { Session } from "@/types/auth/_types";
import { Link } from "@/navigation";
import SkeletonUI from "@/components/ui/skeleton";

export default function UserLink() {
    const {
        session,
    }: {
        session: Session | false;
    } = useSession();

    if(!session) return <SkeletonUI className="h-4 w-28" /> 

    return <Link
        href="/preferences"
    >
        { session.name }
    </Link>
}