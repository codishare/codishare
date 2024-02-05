import { Session } from "@/_types";
import { useSession } from "@/lib/hooks/useSession";
import { ToggleTheme } from "../theme/Toggle";
import { useTranslations } from "next-intl";

import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import SearchBar from "./searchbar";

export default function Navigator() {
    const {
        session,
    }: {
        session: Session | false;
    } = useSession();

    const t = useTranslations(); 

    return <nav className="p-3 border-b flex items-center justify-between">
        <SearchBar />

        {/* @ Right section */}
        <section className="flex items-center gap-3">
            <span className="mr-2 cursor-pointer select-none hover:text-indigo-500 transition">
                { session && session.name }
            </span> 

            <button
                className="flex items-center p-2 rounded-lg border transition-all"
            >
                <SettingsSharpIcon />
            </button>

            <ToggleTheme />
        </section>
    </nav>
}
