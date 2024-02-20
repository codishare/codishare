'use client'

import { Session } from "@/_types"
import { useSession } from "@/lib/hooks/useSession"

export default function Header() {
    const {
        session
    }: {
        session: Session | false;
    } = useSession();

    if(!session) return null;

    return <section className="w-full gap-7 flex items-center bg-white dark:bg-zinc-900 rounded border dark:border-zinc-900 p-5">
        <img 
            className="h-12 w-12 object-cover rounded-full shadow-lg transition-all"
            src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
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