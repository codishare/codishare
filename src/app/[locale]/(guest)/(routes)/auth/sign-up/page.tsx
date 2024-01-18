import { useTranslations } from "next-intl"
import TextInput from "@/components/ui/text-input"
import Form from "@/components/auth/sign-up/form";
import Selector from "@/components/ui/selector";

import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import Checkbox from "@/components/ui/checkbox";

export default function Page() { 
    const t = useTranslations('Auth.SignUp')

    const steps: React.ReactNode[][] = [
        [
            <TextInput 
                label={ t("form.name") }
                placeholder={ t("form.name_placeholder") }
                icon={ <BadgeOutlinedIcon /> }
                name="name"
                required={ true }
            />, 
            <Checkbox
                label={ t('form.terms') }
                name="terms"
                required={ true }
            />
        ],
        [
            <TextInput 
                label={ t("form.email") }
                placeholder={ t("form.email_placeholder") }
                icon={ <AlternateEmailOutlinedIcon /> }
                type="email"
                name="email"
                required={ true }
            />, 
            <TextInput 
                label={ t("form.password") }
                placeholder={ t("form.password_placeholder") }
                icon={ <LockOutlinedIcon /> }
                type="password"
                name="password"
                required={ true }
            />,
            <TextInput 
                label={ t("form.confirm_password") }
                placeholder={ t("form.confirm_password_placeholder") }
                icon={ <LockOutlinedIcon /> }
                type="password"
                name="confirm_password"
                required={ true }
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
            />,
            <Selector 
                label="Role"
                icon={ <AutoGraphOutlinedIcon /> }
                required={ true }
                name={ t("form.role") }
                options={[
                    { label: "Trainee", value: "TRAINEE" },
                    { label: "Junior", value: "JUNIOR" },
                    { label: "Mid", value: "MID" },
                    { label: "Senior", value: "SENIOR" },
                ]}
            />
        ]
    ]

    return <div className="w-[400px] flex flex-col gap-2">
        <h1 className="mt-5 font-extrabold text-gray-700 dark:text-white text-4xl">
            { t("header.white") } <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-400 from-indigo-500">{ t("header.colored") }</span>
        </h1>

        <p className="text-lg font-normal text-gray-500 dark:text-gray-400">{ t("header.description") }</p>

        <Form 
            steps={ steps }
            buttonTranslations={{
                next: t("actions.next"),
                previous: t("actions.previous"),
                start: t("actions.start"),
                alreadyHaveAccount: t("actions.already-have-account"),
                finish: t("actions.finish")
            }}
        /> 
    </div>
}