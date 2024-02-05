"use client";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/navigation";
import TextInput from "@/components/ui/text-input";

import { useNotifications } from "@/lib/hooks/useNotifications";
import { useEffect, useRef, useState } from "react";

import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";

export default function Form() {
    const [code, setCode] = useState("");
    const codeRefs = Array.from({ length: 6 }, () => useRef(null));

    useEffect(() => {
        console.log(codeRefs[0].current);
    }, [codeRefs]); // Agrega codeRefs como dependencia de useEffect para que se ejecute cuando cambie

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const changeCode = (slot: number, number: string) => {
        if (number.length > 1) return; // Evita que el valor sea más largo que 1
        setCode((prev) => {
            const newCode = prev.split("");
            newCode[slot] = number;
            return newCode.join("");
        });
        console.log(codeRefs[slot]);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-4 transition-all"
        >
            <div className="flex items-center gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <TextInput
                        key={i}
                        value={code[i] || ""}
                        ref={codeRefs[i]}
                        change={(value) => changeCode(i, value)}
                        className="w-12 h-12 text-center text-3xl"
                    />
                ))}
            </div>

            {/* <button
                type="submit"
                className="mt-3 border border-inset border-indigo-500 lg:w-fit lg:px-10 hover:bg-indigo-500 dark:hover:bg-indigo-600/40 text-indigo-500 hover:text-white text-sm flex-1 rounded-full py-3 hover:scale-95 transition-all"
            >
                {t("Auth.VerifyCode.form.submit")}
            </button> */}
        </form>
    );
}
