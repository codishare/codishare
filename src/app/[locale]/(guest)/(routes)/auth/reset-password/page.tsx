import Form from "@/components/auth/forgot-password/form";
import prisma from "@/lib/prisma";
import { redirect } from "@/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

const InvalidToken = (t: any) => (
    <div className="w-[400px] flex flex-col gap-2">
        <h1 className="mt-5 font-extrabold text-gray-700 dark:text-white text-4xl">
            {t("header.invalidToken")}{" "}
        </h1>

        <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
            {t("header.invalidTokenDescription")}
        </p>

        <a href="/" className="text-indigo-500 hover:underline w-fit">
            {t("actions.backToHome")}
        </a>
    </div>
);

export default async function Page({
    params: { locale },
    searchParams,
}: {
    params: {
        locale: string;
    };
    searchParams?: {
        token: string;
    };
}) {
    if (!searchParams?.token) return redirect("/auth/login");
    unstable_setRequestLocale(locale);
    const t = await getTranslations("Auth.ForgotPassword");

    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
        where: {
            token: searchParams.token,
        },
        include: {
            user: true,
        },
    });

    if (!resetPasswordToken) return InvalidToken(t);
    const user = resetPasswordToken.user;

    const timeRemaining = resetPasswordToken?.expiresAt.getTime() - Date.now();

    if (timeRemaining <= 0) {
        await prisma.resetPasswordToken.delete({
            where: {
                id: resetPasswordToken.id,
            },
        });

        return InvalidToken(t);
    }

    return (
        <div className="w-[400px] flex flex-col gap-2">
            <h1 className="mt-5 font-extrabold text-gray-700 dark:text-white text-4xl">
                {t("header.white", { name: user.name })}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-400 from-indigo-500">
                    {t("header.colored")}
                </span>
            </h1>

            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                {t("header.description")}
            </p>

            <Form token={searchParams.token} />
        </div>
    );
}
