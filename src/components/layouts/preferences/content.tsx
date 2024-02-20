'use client'

import { Fragment, useEffect, useState } from "react";
import Devices from "./elements/devices/devices" 
import Details from "./elements/details/details";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

interface View {
    label: string;
    element?: JSX.Element;
}

export default function Content() {
    const t = useTranslations('Modules.Preferences.content')

    const views = [ 
        {
            label: t('details'), 
            element: <Details />
        },
        {
            label: t('devices'), 
            element: <Devices />
        },
        {
            label: t('notifications')
        }
    ]

    const [active, setActive] = useState<number>(0)

    const searchParams = useSearchParams();

    useEffect(() => { 
        const current = new URLSearchParams(Array.from(searchParams.entries()));
       
        if(!active) {
            current.delete('presel');
        } else current.set('presel', active.toString());

        if(current.toString().length > 0) window.history.pushState({}, '', `${window.location.pathname}?${current.toString()}`);
    }, [active])

    useEffect(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        const preferenceParam = current.get('presel');

        if (preferenceParam) setActive(parseInt(preferenceParam));
    }, [])
    
    return <Fragment>
        <ul className="flex w-full flex-wrap items-center justify-start gap-4">
            {
                views.map((view: View, index:number) => {
                    return <li key={ view.label } onClick={() => setActive(index)} className={
                        `px-3 py-2 rounded border dark:border-zinc-900 ${ active == index ? "bg-indigo-500 text-white dark:text-zinc-950 border-indigo-500 dark:border-indigo-500" : "bg-white dark:bg-zinc-900 dark:text-zinc-400 text-gray-500" } transition-all cursor-pointer`
                    }>
                        { view.label }
                    </li>
                })
            }
        </ul>

        {
            views[active] ? views[active].element : null
        }
    </Fragment>
}