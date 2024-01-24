'use client'

import { useTranslations } from "next-intl";
import { Link } from "@/navigation"; 
import TextInput from "@/components/ui/text-input";

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import { validate } from "@/services/validation/forms/login";
import { useNotifications } from "@/lib/hooks/useNotifications";

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import { useState } from "react";
import { Login } from "@/_types";

export default function Form() {
    const t = useTranslations();
    const addNotification = useNotifications();

    const [data, setData] = useState<Login>({ 
        email: "", 
        password: ""
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validate(data); 

        if(isValid !== true) return addNotification({
            type: "ERROR", 
            icon: <PriorityHighOutlinedIcon />,
            message: t(`Auth.SignUp.form.errors.${ isValid }`)
        })
    }

    return <form onSubmit={ handleSubmit } className="flex flex-col gap-3 mt-7 transition-all">
        <TextInput 
            label={ t("Auth.SignUp.form.email") }
            placeholder={ t("Auth.SignUp.form.email_placeholder") }
            icon={ <AlternateEmailOutlinedIcon /> }
            type="email"
            name="email"
            required={ true }
            value={ data.email }
            change={ (value) => setData({ ...data, email: value }) }
        />

        <TextInput 
            label={ t("Auth.SignUp.form.password") }
            placeholder={ t("Auth.SignUp.form.password_placeholder") } 
            icon={ <LockOutlinedIcon /> }
            type="password"
            name="password"
            required={ true }
            value={ data.password }
            change={ (value) => setData({ ...data, password: value }) }
        /> 

        <section className="flex mt-3 w-full gap-4">
            <Link className="bg-indigo-500 text-center dark:bg-indigo-600/40 dark:border-[1px] dark:border-indigo-700 text-sm text-semibold flex-1 text-white rounded-full py-3 hover:bg-indigo-700 hover:scale-95 transition" href='/auth/sign-up'>
                { t("Auth.SignIn.actions.doesnt_have_account") }
            </Link>

            <button type="submit" className="border border-inset border-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-600/40 text-indigo-500 hover:text-white text-sm flex-1 rounded-full py-3 hover:scale-95 transition-all">
                { t("Auth.SignIn.actions.sign_in") }
            </button> 
        </section>
    </form>
}