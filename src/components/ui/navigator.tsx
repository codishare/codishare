import { Session } from "@/_types";
import { useSession } from "@/lib/hooks/useSession";
import { ToggleTheme } from "../theme/Toggle";
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import { useTranslations } from "next-intl";

export default function Navigator() {
    const {
        session,
    }: {
        session: Session | false;
    } = useSession();

    const t = useTranslations(); 

    return <nav className="p-3 border-b flex items-center justify-between">
        <section className="flex items-center gap-5 divide-x px-2">
            <img 
                height={ 30 }
                width={ 30 }
                draggable={ false }
                src="/assets/icon.png" 
                className="mix-blend-multiply cursor-pointer"
            />

            <ul className="px-5">
                <li className="flex items-center gap-2 text-black/30 cursor-pointer select-none hover:text-indigo-500 transition dark:text-white">
                    <SpaceDashboardRoundedIcon />

                    { t("Components.UI.navigator.dashboard") }
                </li>
            </ul>
        </section>

        {/* @ Right section */}
        <section className="flex items-center gap-3">
            <span className="mr-2 cursor-pointer select-none hover:text-indigo-500 transition">
                { session && session.name }
            </span>

            <ToggleTheme />
        </section>
    </nav>
}
