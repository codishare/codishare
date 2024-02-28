'use server'

import { auth } from "@/auth";
import Navigator from "@/components/layouts/navigator";
import { redirect } from "@/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if(!session) return redirect('/auth/signin');

    return (
        <main className="w-screen min-h-screen bg-gray-100 dark:bg-zinc-950 flex flex-col gap-3">
            <Navigator />

            { children }
        </main>
    );
}