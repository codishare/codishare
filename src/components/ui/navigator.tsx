import { Session } from "@/_types";
import { useSession } from "@/lib/hooks/useSession";
import { ToggleTheme } from "../theme/Toggle";
<<<<<<< HEAD
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
=======
import Skeleton from "@/components/ui/skeleton";
>>>>>>> a0fe2ff972edf4d891433fc24856ef8655cb2475

export default function Navigator() {
    const {
        session,
    }: {
        session: Session | false;
    } = useSession();

<<<<<<< HEAD
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

                    Dashboard
                </li>
            </ul>
        </section>

        {/* @ Right section */}
        <section className="flex items-center gap-3">
            <span className="mr-2 cursor-pointer select-none hover:text-indigo-500 transition">
                { session && session.name }
            </span>
=======
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
>>>>>>> a0fe2ff972edf4d891433fc24856ef8655cb2475

                <ToggleTheme />
            </section>
        </nav>
    );
}
