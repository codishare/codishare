import { useTranslations } from "next-intl"
import TextInput from "@/components/ui/text-input"
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Steps from "@/components/auth/sign-up/steps";

export default function Page() { 
    const t = useTranslations('Auth.SignUp')

    const steps: React.ReactNode[][] = [
        [
            <TextInput 
                label={ t("form.name") }
                placeholder={ t("form.name_placeholder") }
                icon={ <BadgeOutlinedIcon /> }
                required={ true }
            />
        ],
        [
            <TextInput 
                label={ t("form.email") }
                placeholder={ t("form.email_placeholder") }
                icon={ <BadgeOutlinedIcon /> }
                type="email"
                required={ true }
            />, 
            <TextInput 
                label={ t("form.password") }
                placeholder={ t("form.password_placeholder") }
                icon={ <BadgeOutlinedIcon /> }
                type="password"
                required={ true }
            />,
            <TextInput 
                label={ t("form.confirm_password") }
                placeholder={ t("form.confirm_password_placeholder") }
                icon={ <BadgeOutlinedIcon /> }
                type="password"
                required={ true }
            /> 
        ]
    ]

    return <div className="w-[400px] flex flex-col gap-2">
        <h1 className="mt-5 font-extrabold text-gray-700 dark:text-white text-4xl">
            { t("header.white") } <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-400 from-indigo-500">{ t("header.colored") }</span>
        </h1>

        <p className="text-lg font-normal text-gray-500 dark:text-gray-400">{ t("header.description") }</p>

        <Steps 
            steps={ steps }
            buttonTranslations={{
                next: t("actions.next"),
                previous: t("actions.previous"),
                start: t("actions.start"),
                alreadyHaveAccount: t("actions.already-have-account"),
            }}
        /> 
    </div>
}