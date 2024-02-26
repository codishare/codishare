'use client'

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSession } from "@/lib/hooks/useSession";
import { Session } from "@/types/auth/_types";

import SettingsSharpIcon from '@mui/icons-material/SettingsSharp'; 
import Logout from "./settings/logout";
import { SupportOutlined } from "@mui/icons-material";
import Profile from "./settings/profile";
import Language from "./settings/language"; 
import { useTranslations } from "next-intl";
import ProfilePicture from "../ui/profile-picture";

export default function Settings() {
    const [focused, setFocused] = useState(false);
    const t = useTranslations('Components.UI.aside_settings');

    const {
        session,
    }: {
        session: Session | false;
    } = useSession();

    return <div>
        <button
            className="flex items-center p-2 rounded-lg border dark:border-zinc-900 transition-all"
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
                    className="h-screen w-screen fixed z-30 top-0 left-0 bg-black/40 dark:bg-zinc-800/40 backdrop-blur-sm flex items-center justify-end"
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
                            <ProfilePicture icon={ session && session.icon ? session.icon : '' } />

                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl">
                                    { session && session.name }
                                </h2>

                                <small className="text-gray-400 text-xs">
                                    @{ session && session.alias }
                                </small>
                            </div>
                        </section>

                        {/* @ Settings */}
                        <section className="h-full">
                            <ul className="flex pt-5 flex-col h-full gap-4">
                                {/* @ Settings */}
                                <Profile />
                                <Language />

                                {/* @ Separator */}
                                <div className="flex-1"></div>

                                {/* @ Bottom of the list */}
                                <li
                                    className="flex gap-3 items-center cursor-pointer bg-zinc-100 dark:bg-zinc-800 text-sm p-2.5 hover:bg-indigo-500 dark:hover:bg-indigo-500 dark:hover:text-white hover:text-white transition rounded-lg"
                                >
                                    <SupportOutlined />

                                    { t('support') }
                                </li>

                                <Logout />
                            </ul>
                        </section>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    </div>
}