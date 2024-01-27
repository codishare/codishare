"use client";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/navigation";
import TextInput from "@/components/ui/text-input";

import { useNotifications } from "@/lib/hooks/useNotifications";
import { useState } from "react";

import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import { validate } from "@/services/validation/forms/reset-password";

export default function Form({ token }: { token: string }) {
    const t = useTranslations();
    const addNotification = useNotifications();
    const router = useRouter();

    const [data, setData] = useState({
        password: "",
        confirm_password: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validate(data);

        if (isValid !== true)
            return addNotification({
                type: "ERROR",
                icon: <PriorityHighOutlinedIcon />,
                message: t(`Auth.ForgotPassword.form.errors.${isValid}`),
            });

        try {
            fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: data.password,
                    confirm_password: data.confirm_password,
                    token: token,
                }),
            }).then(async (res) => {
                const data = await res.json();

                if (res.status == 200 || res.status == 201) {
                    addNotification({
                        type: "SUCCESS",
                        icon: <CheckCircleOutlinedIcon />,
                        message: t(`Auth.ForgotPassword.form.${data.message}`),
                    });

                    router.push("/auth/login");
                } else {
                    addNotification({
                        type: "ERROR",
                        icon: <DnsOutlinedIcon />,
                        message: t(
                            `Auth.ForgotPassword.form.errors.${data.message}`
                        ),
                    });
                }
            });
        } catch (error) {
            addNotification({
                type: "ERROR",
                icon: <DnsOutlinedIcon />,
                message: t(`Auth.ForgotPassword.form.errors.${error.message}`),
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-7 transition-all"
        >
            <TextInput
                label={t("Auth.ForgotPassword.form.new_password")}
                placeholder={t("Auth.ForgotPassword.form.new_password")}
                icon={<AlternateEmailOutlinedIcon />}
                type="password"
                name="password"
                required={true}
                value={data.password}
                change={(value) => setData({ ...data, password: value })}
            />

            <TextInput
                label={t("Auth.ForgotPassword.form.confirm_password")}
                placeholder={t("Auth.ForgotPassword.form.confirm_password")}
                icon={<AlternateEmailOutlinedIcon />}
                type="password"
                name="password"
                required={true}
                value={data.confirm_password}
                change={(value) =>
                    setData({ ...data, confirm_password: value })
                }
            />

            <button
                type="submit"
                className="mt-3 border border-inset border-indigo-500 lg:w-fit lg:px-10 hover:bg-indigo-500 dark:hover:bg-indigo-600/40 text-indigo-500 hover:text-white text-sm flex-1 rounded-full py-3 hover:scale-95 transition-all"
            >
                {t("Auth.ForgotPassword.actions.resetPassword")}
            </button>
        </form>
    );
}
