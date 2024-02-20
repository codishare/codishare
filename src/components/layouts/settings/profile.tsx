import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Profile() {
    const t = useTranslations('Components.UI.aside_settings');

    return <Link
        href="/preferences"
        className="flex gap-3 items-center cursor-pointer bg-zinc-100 dark:bg-zinc-800 text-sm p-2.5 hover:bg-indigo-500 hover:text-white transition rounded-lg dark:hover:bg-indigo-500 dark:hover:text-white"
    >
        <AdminPanelSettingsOutlined />

        { t('profile') }
    </Link>
}