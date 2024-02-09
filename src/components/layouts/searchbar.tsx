import TextInput from "../ui/text-input";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Pill from "../ui/pill";

export default function SearchBar() { 
    const [focused, setFocused] = useState<boolean>(false);
    const t = useTranslations(); 

    return <section>
        <TextInput
            placeholder={ t("Components.UI.navigator.bar") }
            icon={ <SearchOutlinedIcon /> }
            className="py-1.5"
            type="text"
            focus={ () => setFocused(true) }
        />

        <AnimatePresence>
            {
                focused && <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setFocused(false)} 
                    className="h-screen w-screen fixed top-0 left-0 bg-black/40 dark:bg-zinc-800/40 backdrop-blur-sm flex items-center justify-center"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={(e) => e.stopPropagation()} 
                        className="bg-white dark:bg-zinc-900 p-5 w-[600px] flex flex-col gap-3 shadow rounded-lg"
                    >
                        {/* @ Filter */} 
                        <TextInput
                            placeholder={ t("Components.UI.navigator.bar") }
                            icon={ <SearchOutlinedIcon /> }
                            type="text"
                        /> 

                        {/* @ Pills */}
                        <section className="flex items-center gap-3">
                            <Pill containerClass="border-indigo-500 bg-indigo-500/20 text-indigo-500" pillClass="bg-indigo-500">{ t('Components.UI.searchbar.user') }</Pill> 
                            <Pill containerClass="border-amber-500 bg-amber-500/20 text-amber-500" pillClass="bg-amber-500">{ t('Components.UI.searchbar.project') }</Pill> 
                        </section>

                        {/* @ Results */}
                        <section className="text-sm text-black/40 dark:text-white text-center mt-5">
                            { t('Components.UI.searchbar.no_results') }
                        </section>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    </section>
}