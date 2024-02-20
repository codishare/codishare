'use client'

import { ExpandMoreOutlined } from "@mui/icons-material";
import { useRouter, usePathname } from '@/navigation'; 
import { useTranslations } from "next-intl";

export default function Language() {
    const router = useRouter();
    const pathname = usePathname();  

    const t = useTranslations('Components.UI.aside_settings')

    const switchLang = (lang: string) => router.push(pathname, { locale: lang });

    return <li className="flex flex-col gap-3 group transition-all">
        <section
            className="flex gap-3 items-center cursor-pointer bg-zinc-100 dark:bg-zinc-800 text-sm p-2.5 hover:bg-indigo-500 hover:text-white transition rounded-lg dark:hover:bg-indigo-500 dark:hover:text-white"
        >
            <ExpandMoreOutlined />

            { t('language') }
        </section>

        <section className="flex-col gap-3 hidden group-hover:flex transition-all">
            <article onClick={() => switchLang('en')} className="flex gap-3 border border-gray-700 rounded p-2.5 cursor-pointer select-none text-sm hover:border-indigo-500 hover:text-white hover:bg-indigo-500 transiton-all">
                <span>
                    🇬🇧
                </span>

                English
            </article>

            <article onClick={() => switchLang('es')} className="flex gap-3 border border-gray-700 rounded p-2.5 cursor-pointer select-none text-sm hover:border-indigo-500 hover:text-white hover:bg-indigo-500 transiton-all">
                <span>
                    🇪🇸
                </span>

                Español
            </article>
        </section>
    </li>
}