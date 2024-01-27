"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/navigation";
import TextInput from "@/components/ui/text-input";

import { validate } from "@/services/validation/forms/login";
import { isEmail } from "@/services/validation/email";
import { useNotifications } from "@/lib/hooks/useNotifications";
import { useState } from "react";
import { Login } from "@/_types";

import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";

export default function Form() {
    const t = useTranslations();
    const locale = useLocale();
    console.log(locale);
    const addNotification = useNotifications();
    const router = useRouter();

    const [data, setData] = useState<Login>({
        email: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validate(data);

        if (isValid !== true)
            return addNotification({
                type: "ERROR",
                icon: <PriorityHighOutlinedIcon />,
                message: t(`Auth.SignUp.form.errors.${isValid}`),
            });

        try {
            fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(async (res) => {
                const data = await res.json();

                if (res.status == 200) {
                    localStorage.setItem("access_token", data.access_token);

                    router.push("/");
                } else {
                    addNotification({
                        type: "ERROR",
                        icon: <DnsOutlinedIcon />,
                        message: t(`Auth.SignIn.form.errors.${data.message}`),
                    });
                }
            });
        } catch (error) {
            return addNotification({
                type: "ERROR",
                icon: <DnsOutlinedIcon />,
                message: t("Errors.internal-server-error"),
            });
        }
    };

    const handleForgotPassword = () => {
        if (!isEmail(data.email))
            return addNotification({
                type: "ERROR",
                icon: <PriorityHighOutlinedIcon />,
                message: t("Auth.SignIn.form.errors.email"),
            });

        try {
            fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: data.email, locale }),
            }).then(async (res) => {
                const data = await res.json();

                if (res.status == 200) {
                    addNotification({
                        type: "SUCCESS",
                        icon: <DnsOutlinedIcon />,
                        message: t("Auth.SignIn.forgot_password.success"),
                    });
                } else {
                    addNotification({
                        type: "ERROR",
                        icon: <DnsOutlinedIcon />,
                        message: t(
                            `Auth.SignIn.forgot_password.errors.${data.message}`
                        ),
                    });
                }
            });
        } catch (error) {
            return addNotification({
                type: "ERROR",
                icon: <DnsOutlinedIcon />,
                message: t("Errors.internal-server-error"),
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 mt-7 transition-all"
        >
            <TextInput
                label={t("Auth.SignUp.form.email")}
                placeholder={t("Auth.SignUp.form.email_placeholder")}
                icon={<AlternateEmailOutlinedIcon />}
                type="email"
                name="email"
                required={true}
                value={data.email}
                change={(value) => setData({ ...data, email: value })}
            />

            <TextInput
                label={t("Auth.SignUp.form.password")}
                placeholder={t("Auth.SignUp.form.password_placeholder")}
                icon={<LockOutlinedIcon />}
                type="password"
                name="password"
                required={true}
                value={data.password}
                change={(value) => setData({ ...data, password: value })}
            />

            <button
                className="text-sm -mt-4 w-fit text-start text-indigo-300 hover:text-indigo-400 hover:underline transition"
                onClick={handleForgotPassword}
                type="button"
            >
                {t("Auth.SignIn.forgot_password.title")}
            </button>

            <section className="flex mt-3 w-full gap-4">
                <Link
                    className="bg-indigo-500 text-center dark:bg-indigo-600/40 dark:border-[1px] dark:border-indigo-700 text-sm text-semibold flex-1 text-white rounded-full py-3 hover:bg-indigo-700 hover:scale-95 transition"
                    href="/auth/sign-up"
                >
                    {t("Auth.SignIn.actions.doesnt_have_account")}
                </Link>

                <button
                    type="submit"
                    className="border border-inset border-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-600/40 text-indigo-500 hover:text-white text-sm flex-1 rounded-full py-3 hover:scale-95 transition-all"
                >
                    {t("Auth.SignIn.actions.sign_in")}
                </button>
            </section>
        </form>
    );
}
