import { Session } from "@/_types";
import { useSession } from "@/lib/hooks/useSession";
import { ToggleTheme } from "../theme/Toggle";
import Skeleton from "@/components/ui/skeleton";

export default function Navigator() {
    const {
        session,
    }: {
        session: Session | false;
    } = useSession();

    return (
        <nav className="p-3 border-b flex items-center justify-between">
            <h1 className="font-extrabold text-gray-700 dark:text-white text-lg">
                Codi
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-400 from-indigo-500">
                    Share
                </span>
            </h1>

            <section className="flex items-center gap-3">
                {session ? (
                    <span className="mr-2">{session && session.name}</span>
                ) : (
                    <Skeleton className="w-20 h-6" />
                )}

                <ToggleTheme />
            </section>
        </nav>
    );
}
