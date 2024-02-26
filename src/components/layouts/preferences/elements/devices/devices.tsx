'use client'

import { Device, Session } from "@/types/auth/_types"
import { useSession } from "@/lib/hooks/useSession";
import Icon from "./icon";
import Location from "./location";
import { motion } from "framer-motion";  
import Template from "./skeleton";

export default function Devices() { 
    const {
        session
    } : {
        session: Session | false; 
    } = useSession(); 

    return <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .4 }}
        exit={{ opacity: 0 }} 
        className="w-full bg-white dark:bg-zinc-900 dark:border-zinc-950 dark:divide-zinc-950 dark:text-zinc-400 px-7 flex flex-col divide-y border rounded"
    >
        {
            session && session.devices ? session.devices.map((device: Device) => {
                const {
                    device: device_type,
                    browser, 
                    os, 
                    ip
                } : Device = device;

                return <article 
                    key={ device.id }
                    className="py-5 flex items-center gap-5 flex-wrap"
                >
                    <span className="material-symbols-outlined">
                        {
                            device_type ? <Icon 
                                device_type={ device_type.toString() }
                            /> : 'computer'
                        }
                    </span>

                    <section className="flex-1 flex flex-col gap-1">
                        <h1 className="text-lg dark:text-white">
                            { browser }
                        </h1>

                        <p className="text-xs text-gray-400">
                            { os ? os : 'Unknown OS' }
                        </p>
                    </section>
                    
                    <Location ip={ ip } />
                </article>
            }) : [...Array(3)].map(() => {
                return <Template /> 
            })
        }
    </motion.section>
}