'use client'

import { ToggleTheme } from "@/components/theme/Toggle"

export default function Layout({ 
    children 
} : { 
    children: React.ReactNode 
}) {
    return (
        <main className="h-screen w-screen flex flex-col items-center">
            {/* @ Toggle theme */}
            <section className="fixed right-0 top-0 m-5">
                <ToggleTheme />
            </section>

            {/* @ Content */}
            <section className="flex-1 flex items-center">
                { children }
            </section>
        </main>
    )
}