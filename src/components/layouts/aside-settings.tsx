import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSession } from "@/lib/hooks/useSession";
import { Session } from "@/_types";

import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import Spinner from "../ui/spinner/component";
import Logout from "./settings/logout";

export default function Settings() {
    const [focused, setFocused] = useState<boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    
    const {
        session,
    }: {
        session: Session | false;
    } = useSession();

    if(loading) return <Spinner />; 

    return <div>
        <button
            className="flex items-center p-2 rounded-lg border transition-all"
            onClick={() => setFocused(true)}
        >
            <SettingsSharpIcon />
        </button>

        <AnimatePresence>
            {
                focused && <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setFocused(false)} 
                    className="h-screen w-screen fixed top-0 left-0 bg-black/40 dark:bg-zinc-800/40 backdrop-blur-sm flex items-center justify-end"
                >
                    <motion.div 
                        initial={{ opacity: 0, right: '-100%', width: '450px' }}
                        animate={{ opacity: 1, right: 0, width: '350px' }}
                        transition={{ duration: 0.2 }}
                        exit={{ opacity: 0, right: '-100%', width: '450px' }}
                        onClick={(e) => e.stopPropagation()} 
                        className="bg-white dark:bg-zinc-900 p-5 h-screen w-[350px] flex flex-col gap-5 divide-y shadow"
                    >
                        {/* @ Profile information */}
                        <section className="flex gap-5 h-12 items-center">
                            <div className="rounded-full border w-12 h-12">
                                {/* @ Image */}
                            </div>

                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl">
                                    { session && session.name }
                                </h2>

                                <small className="text-gray-400 text-xs">
                                    { session && session.alias }
                                </small>
                            </div>
                        </section>

                        {/* @ Settings */}
                        <section className="py-5">
                            <ul>
                                <Logout handleLoad={(bool: boolean) => setLoading(bool)} />
                            </ul>
                        </section>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    </div>
}