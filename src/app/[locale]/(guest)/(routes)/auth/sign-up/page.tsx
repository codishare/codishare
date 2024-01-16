import { useTranslations } from "next-intl"

export default function Page() {
    const t = useTranslations('Auth.SignUp')

    return <div className="w-[400px]">
        <img 
            src="/assets/auth-avatar.gif"
            alt="Avatar"
            draggable={ false }
            width={ 100 }
        />

        <h1 className="mb-4 text-3xl mt-5 font-extrabold text-gray-900 dark:text-white md:text-5xl">
            { t("header.white") } <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-400 from-indigo-500">{ t("header.colored") }</span>
        </h1>

        <p className="text-lg font-normal text-gray-500 dark:text-gray-400">{ t("header.description") }</p>

        <section className="flex w-full gap-4 mt-5">
            <button className="bg-indigo-500 text-sm flex-1 text-white rounded-full py-3 hover:bg-indigo-700 transition-all">
                Tengo cuenta
            </button>

            <button className="border border-indigo-500 text-indigo-500 text-sm flex-1 rounded-full py-3 hover:scale-95 transition-all">
                Comenzar
            </button>
        </section>
    </div>
}