'use client'

import { useState } from "react";
import { useTranslations } from "next-intl";  
import { View } from "@/types/preferences/_types";
import { Link } from "@/navigation";

export default function Selector({
    route
} : {
    route: string
}) {
    const t = useTranslations('Modules.Preferences.content')

    const views = [ 
        {
            label: t('details'), 
            route: "/preferences"
        },
        {
            label: t('devices'), 
            route: "/preferences/devices"
        }
    ]

    const [active, setActive] = useState<string>(route)
    
    return <section className="flex w-full flex-wrap items-center justify-start gap-4"> 
        {
            views.map((view: View) => {
                return <Link href={ view.route } key={ view.label } onClick={() => setActive(view.route)} className={
                    `px-3 py-2 rounded border dark:border-zinc-900 ${ active == view.route ? "bg-indigo-500 text-white dark:text-zinc-950 border-indigo-500 dark:border-indigo-500" : "bg-white dark:bg-zinc-900 dark:text-zinc-400 text-gray-500" } transition-all cursor-pointer`
                }>
                    { view.label }
                </Link>
            })
        } 
    </section>
}