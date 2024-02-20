'use client'

import { useNotifications } from "@/lib/hooks/useNotifications"; 
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; 
import { DnsOutlined } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

export default function Logout({
    handleLoad
} : {
    handleLoad: (loading: boolean) => void;
}) {
    const addNotification = useNotifications(); 
    const router = useRouter(); 

    const t = useTranslations(); 

    return <li
        className="flex gap-3 items-center cursor-pointer bg-zinc-100 dark:bg-zinc-800 text-sm p-2.5 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition rounded-lg"
        onClick={() => {
            try {
                handleLoad(true);

                fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        access_token: localStorage.getItem('access_token'),
                    })
                }).then(async (res) => {
                    const data = await res.json();

                    if (res.status == 200) {
                        localStorage.removeItem('access_token');
                        router.push('/auth/login'); 
                    } else {
                        addNotification({
                            type: "ERROR",
                            icon: <DnsOutlined />,
                            message: t(
                                `Auth.SignIn.forgot_password.errors.${data.message}`
                            ),
                        });
                    }
                }).finally(() => handleLoad(false));
            } catch (error) {
                handleLoad(false);

                return addNotification({
                    type: "ERROR",
                    icon: <DnsOutlined />,
                    message: t("Errors.internal-server-error"),
                });
            }
        }}
    >
        <PersonOutlineIcon />

        { t('Components.UI.aside_settings.logout') }
    </li>
}