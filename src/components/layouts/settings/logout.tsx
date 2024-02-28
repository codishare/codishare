import { useTranslations } from "next-intl";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; 
import { signOut } from "next-auth/react";

export default function Logout() {
    const t = useTranslations(); 

    return <li
        className="flex gap-3 items-center cursor-pointer bg-zinc-100 dark:bg-zinc-800 text-sm p-2.5 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition rounded-lg"
        onClick={() => signOut()}
    >
        <PersonOutlineIcon />

        { t('Components.UI.aside_settings.logout') }
    </li>
}