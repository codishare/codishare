'use server'

import { auth } from "@/auth"

export default async function Header() {
    const session = await auth()

    return <section
        className="w-full gap-7 flex items-center bg-white dark:bg-zinc-900 rounded border dark:border-zinc-900 p-5"
    >
        <article className="flex flex-col">
            <h1 className="font-bold">
                { session?.user?.name }
            </h1>

            <p className="text-gray-500 text-xs">
                { session?.user?.email }
            </p>
        </article>
    </section>
}