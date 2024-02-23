'use client'

import { useState } from "react";
import { Link } from "@/navigation"; 
import { validate } from "@/lib/services/shared/auth/sign-up";
import { useNotifications } from "@/lib/hooks/useNotifications";
import { useTranslations } from "next-intl";

import Selector from "@/components/ui/selector";
import Checkbox from "@/components/ui/checkbox";
import TextInput from "@/components/ui/text-input"
import type { SignUp } from "@/types/auth/_types";

import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';

export default function Form() {
    const t = useTranslations();

    const [data, setData] = useState<SignUp>({
        name: "", 
        email: "", 
        password: "", 
        confirm_password: "", 
        terms: false, 
        stack: "", 
        role: ""
    });

    const steps: React.ReactNode[][] = [
        [
            <TextInput 
                label={ t("Auth.SignUp.form.name") }
                placeholder={ t("Auth.SignUp.form.name_placeholder") }
                icon={ <BadgeOutlinedIcon /> }
                name="name"
                required={ true }
                value={ data.name }
                change={ (value) => setData({ ...data, name: value }) }
            />, 
            <Checkbox
                label={ t('Auth.SignUp.form.terms') }
                name="terms"
                required={ true }
                value={ data.terms }
                change={ (value) => setData({ ...data, terms: value }) }
            />
        ],
        [
            <TextInput 
                label={ t("Auth.SignUp.form.email") }
                placeholder={ t("Auth.SignUp.form.email_placeholder") }
                icon={ <AlternateEmailOutlinedIcon /> }
                type="email"
                name="email"
                required={ true }
                value={ data.email }
                change={ (value) => setData({ ...data, email: value }) }
            />, 
            <TextInput 
                label={ t("Auth.SignUp.form.password") }
                placeholder={ t("Auth.SignUp.form.password_placeholder") }
                icon={ <LockOutlinedIcon /> }
                type="password"
                name="password"
                required={ true }
                value={ data.password }
                change={ (value) => setData({ ...data, password: value }) }
            />,
            <TextInput 
                label={ t("Auth.SignUp.form.confirm_password") }
                placeholder={ t("Auth.SignUp.form.confirm_password_placeholder") }
                icon={ <LockOutlinedIcon /> }
                type="password"
                name="confirm_password"
                required={ true }
                value={ data.confirm_password }
                change={ (value) => setData({ ...data, confirm_password: value }) }
            /> 
        ],
        [
            <Selector 
                label="Stack"
                icon={ <CodeOutlinedIcon /> }
                required={ true }
                name="stack"
                options={[
                    { label: "Frontend", value: "FRONTEND" },
                    { label: "Backend", value: "BACKEND" },
                    { label: "Fullstack", value: "FULLSTACK" },
                ]}
                value={ data.stack }
                change={ (value) => setData({ ...data, stack: value }) }
            />,
            <Selector 
                label={ t("Auth.SignUp.form.role") }
                icon={ <AutoGraphOutlinedIcon /> }
                required={ true }
                name="role"
                options={[
                    { label: "Trainee", value: "TRAINEE" },
                    { label: "Junior", value: "JUNIOR" },
                    { label: "Mid", value: "MID" },
                    { label: "Senior", value: "SENIOR" },
                ]}
                value={ data.role }
                change={ (value) => setData({ ...data, role: value }) }
            />
        ]
    ]

    const addNotification = useNotifications(); 
    const [step, setStep] = useState(0)

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStep((step + 1) > (steps.length - 1) ? step : step + 1)
    }

    const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStep((step - 1) < 0 ? step : step - 1)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isValid = validate(data); 

        if(isValid !== true) return addNotification({
            type: "ERROR", 
            icon: <PriorityHighOutlinedIcon />,
            message: t(`Auth.SignUp.form.errors.${ isValid }`)
        })

        try {
            fetch("/api/auth/register", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(data)
            }).then(async (res) => {
                const data = await res.json(); 

                if(res.status == 200 || res.status == 201) {
                    addNotification({
                        type: "SUCCESS", 
                        icon: <CheckCircleOutlinedIcon />,
                        message: t("Auth.SignUp.form.account_success")
                    })
                } else {
                    addNotification({
                        type: "ERROR", 
                        icon: <DnsOutlinedIcon />,
                        message: t(`Auth.SignUp.form.errors.${ data.message }`)
                    })
                }
            })
        } catch (error) {
            return addNotification({
                type: "ERROR", 
                icon: <DnsOutlinedIcon />,
                message: t("Errors.internal-server-error")
            })
        }
    }

    return <form onSubmit={ handleSubmit } className="flex flex-col gap-3 mt-7 transition-all">
        {
            steps[step].map((step, index) => {
                return <div key={ index }>
                    { step }
                </div>
            })
        }

        <section className="flex mt-3 w-full gap-4">
            {
                step == 0 && <Link className="bg-indigo-500 text-center dark:bg-indigo-600/40 dark:border-[1px] dark:border-indigo-700 text-sm text-semibold flex-1 text-white rounded-full py-3 hover:bg-indigo-700 hover:scale-95 transition" href='/auth/login'>
                    { t("Auth.SignUp.actions.already-have-account") }
                </Link>
            }

            {
                step != 0 && <button onClick={ handlePrevious } className="bg-indigo-500 dark:bg-indigo-600/40 dark:border-[1px] dark:border-indigo-700 text-sm text-semibold flex-1 text-white rounded-full py-3 hover:bg-indigo-700 hover:scale-95 transition">
                    { t("Auth.SignUp.actions.previous") }
                </button>
            }

            {
                step == (steps.length - 1) ? <button type="submit" className="border border-inset border-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-600/40 text-indigo-500 hover:text-white text-sm flex-1 rounded-full py-3 hover:scale-95 transition-all">
                    { t("Auth.SignUp.actions.finish") }
                </button> : <button onClick={ handleNext } className="border border-inset border-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-600/40 text-indigo-500 hover:text-white text-sm flex-1 rounded-full py-3 hover:scale-95 transition-all">
                    { 
                        step == 0 ? 
                            t("Auth.SignUp.actions.start")
                        : t("Auth.SignUp.actions.next")
                    }
                </button> 
            }
        </section>
    </form> 
}