'use client'

import { Session } from "@/_types"
import { useSession } from "@/lib/hooks/useSession"
import Image from "next/image";

export default function Header() {
    const {
        session
    }: {
        session: Session | false;
    } = useSession();

    if(!session) return null;

    return <section className="w-full gap-7 flex items-center bg-white dark:bg-zinc-900 rounded border dark:border-zinc-900 p-5">
        <Image
            src={ session.icon.replace(/\\/g, '/') }
            alt="Icon"
            width={48}
            height={48}
            className="h-12 w-12 object-cover rounded-full shadow-lg transition-all"
        />

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