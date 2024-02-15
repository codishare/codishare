import { Session } from "@/_types";
import { useSession } from "@/lib/hooks/useSession";
import { ToggleTheme } from "../theme/Toggle";
import { useTranslations } from "next-intl";

import SearchBar from "./searchbar";
import Settings from "./aside-settings";

export default function Navigator() {
    const {
        session,
    }: {
        session: Session | false;
    } = useSession();

    const t = useTranslations(); 

    return <nav className="px-2 bg-white py-3 shadow flex items-center justify-between">
        <SearchBar />

        {/* @ Right section */}
        <section className="flex items-center gap-3">
            <span className="mr-2 cursor-pointer select-none hover:text-indigo-500 transition">
                { session && session.name }
            </span> 

            <Settings />

            <ToggleTheme />
        </section>
    </nav>
}
