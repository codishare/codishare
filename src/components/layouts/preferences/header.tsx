'use client'

import { Session } from "@/types/auth/_types"
import ProfilePicture from "@/components/ui/profile-picture";
import { useSession } from "@/lib/hooks/useSession" 
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
    const {
        session
    }: {
        session: Session | false;
    } = useSession();

    if(!session) return null;

    return <AnimatePresence> 
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            className="w-full gap-7 flex items-center bg-white dark:bg-zinc-900 rounded border dark:border-zinc-900 p-5"
        >
            <ProfilePicture icon={ session && session.icon ? session.icon : '' } />

            <article className="flex flex-col">
                <h1 className="font-bold">
                    {session.name}
                </h1>

                <p className="text-gray-500 text-xs">
                    @{ session.alias }
                </p>
            </article>
        </motion.section>
    </AnimatePresence>
}