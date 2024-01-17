import { useTranslations } from "next-intl"
import { ToogleTheme } from '@/components/theme/toogleTheme';

export default function Page() {
    const t = useTranslations('Auth.SignUp')

    return <div className="w-full max-sm:px-10 sm:w-[450px]">
        {/* <ToogleTheme /> */}

        <img 
            src="/assets/auth-avatar.gif"
            alt="Avatar"
            draggable={ false }
            width={ 100 }
        />

        <h1 className="mt-5 font-extrabold text-gray-700 dark:text-white text-5xl text-balance">
            { t("header.white") } <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-400 from-indigo-500">{ t("header.colored") }</span>
        </h1>

        <p className="mt-2 text-lg font-normal text-gray-500 dark:text-gray-400 text-balance">{ t("header.description") }</p>

        <section className="flex w-full gap-4 mt-5">
            <button className="bg-sky-600 dark:bg-sky-600/40 dark:border-[1px] dark:border-sky-500 text-sm text-semibold flex-1 text-white rounded-full py-3 hover:bg-sky-500 hover:scale-95 transition">
                Tengo cuenta
            </button>

            <button className="border border-[1px] border-inset border-sky-500 hover:bg-sky-500 dark:hover:bg-sky-600/40 text-sky-500 hover:text-white text-sm flex-1 rounded-full py-3 hover:scale-95 transition-all">
                Comenzar
            </button>
        </section>
    </div>
}