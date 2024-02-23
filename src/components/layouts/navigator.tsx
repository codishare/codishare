import { Session } from "@/_types";
import { useSession } from "@/lib/hooks/useSession";
import { ToggleTheme } from "@/components/ui/theme/toggle";

import SearchBar from "./searchbar";
import Settings from "./aside-settings";

export default function Navigator() {
    const {
        session,
    }: {
        session: Session | false;
    } = useSession();

    return <nav className="px-3 md:px-2 bg-white dark:text-zinc-400 dark:bg-zinc-950 py-3 shadow flex-col md:flex-row dark:shadow-none flex md:items-center gap-4 md:gap-0 justify-between">
        <SearchBar />

        {/* @ Right section */}
        <section className="flex items-center gap-3 order-1 md:order-2">
            <span className="mr-2 cursor-pointer select-none hover:text-indigo-500 flex-1 md:flex-none transition">
                { session && session.name }
            </span> 

            <Settings />

            <ToggleTheme />
        </section>
    </nav>
}
