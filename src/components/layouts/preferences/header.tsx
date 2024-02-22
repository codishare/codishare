'use client'

import { Session } from "@/_types"
import ProfilePicture from "@/components/ui/profile-picture";
import { useSession } from "@/lib/hooks/useSession" 

export default function Header() {
    const {
        session
    }: {
        session: Session | false;
    } = useSession();

    if(!session) return null;

    return <section className="w-full gap-7 flex items-center bg-white dark:bg-zinc-900 rounded border dark:border-zinc-900 p-5">
        <ProfilePicture icon={ session.icon } />

        <article className="flex flex-col">
            <h1 className="font-bold">
                {session.name}
            </h1>

            <p className="text-gray-500 text-xs">
                @{ session.alias }
            </p>
        </article>
    </section>
}