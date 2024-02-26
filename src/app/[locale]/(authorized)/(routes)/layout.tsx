'use server'

import Navigator from "@/components/layouts/navigator";  

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-screen min-h-screen bg-gray-100 dark:bg-zinc-950 flex flex-col gap-3">
            <Navigator />

            { children }
        </main>
    );
}
