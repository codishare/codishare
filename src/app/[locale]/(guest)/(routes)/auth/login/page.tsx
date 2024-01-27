import Form from "@/components/auth/login/form";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Page({
    params: { locale },
}: {
    params: {
        locale: string;
    };
}) {
    unstable_setRequestLocale(locale);

    const t = useTranslations("Auth.SignIn");

    return (
        <div className="w-[400px] flex flex-col gap-2">
            <h1 className="mt-5 font-extrabold text-gray-700 dark:text-white text-4xl">
                {t("header.white")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-400 from-indigo-500">
                    {t("header.colored")}
                </span>
            </h1>

            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                {t("header.description")}
            </p>

            <Form />
        </div>
    );
}
