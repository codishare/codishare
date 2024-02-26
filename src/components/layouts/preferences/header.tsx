'use client'

import { Session } from "@/types/auth/_types"
import ProfilePicture from "@/components/ui/profile-picture";
import { useSession } from "@/lib/hooks/useSession" 
import { AnimatePresence, motion } from "framer-motion"; 
import { Skeleton } from "@mui/material";

export default function Header() {
    const {
        session
    }: {
        session: Session | false;
    } = useSession(); 

    return <AnimatePresence> 
        <section
            className="w-full gap-7 flex items-center bg-white dark:bg-zinc-900 rounded border dark:border-zinc-900 p-5"
        >
            {
                session ? <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: .3 }}
                    className="flex gap-5 items-center"
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
                </motion.div> : <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: .3 }}
                    className="flex gap-5 items-center"
                >
                    {/* @ Loading */}
                    <Skeleton variant="circular" width={48} height={48} />

                    <article className="flex flex-col">
                        <Skeleton variant="text" width={100} height={20} />

                        <Skeleton variant="text" width={100} height={20} />
                    </article>
                </motion.div>
            }
        </section>
    </AnimatePresence>
}