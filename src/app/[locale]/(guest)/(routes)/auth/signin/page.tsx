import Github from "@/components/ui/buttons/github";
import Google from "@/components/ui/buttons/google";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export default async function Page({
    params: { locale }
} : {
    params: {
        locale: string
    }
}) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations('Auth.SignIn')

    return <article className="w-[400px] flex flex-col gap-3">
        <h1 className="mt-5 font-extrabold text-gray-700 dark:text-white text-4xl">
            {t("header.white")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-400 from-indigo-500">
                {t("header.colored")}
            </span>
        </h1>

        <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
            {t("header.description")}
        </p>
        
        <Github />

        <Google />
    </article>
}