import { useTranslations } from "next-intl"

export default function Page() {
    const t = useTranslations('Auth.SignUp')

    return <div className="w-[400px]">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
            { t("header.white") } <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{ t("header.colored") }</span>
        </h1>

        <p className="text-lg font-normal text-gray-500 dark:text-gray-400">{ t("header.description") }</p>
    </div>
}