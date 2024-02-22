import { PreferencesForm, Session } from "@/_types";
import Selector from "@/components/ui/selector";
import TextInput from "@/components/ui/text-input";
import { useNotifications } from "@/lib/hooks/useNotifications";
import { useSession } from "@/lib/hooks/useSession";
import validate from "@/services/validation/forms/preferences";
import { AutoGraphOutlined, CancelOutlined, CheckCircleOutlineRounded, CodeOutlined, FilterCenterFocusOutlined } from "@mui/icons-material";
import PriorityHighOutlined from "@mui/icons-material/PriorityHighOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Information() {
    const {
        session,
        refetchSession
    } : {
        session: Session | false,
        refetchSession: () => void
    } = useSession();
    
    if(!session) return;
    
    const iconRef = useRef<HTMLInputElement>(null);
    const bannerRef = useRef<HTMLInputElement>(null);

    const [banner, handleBanner] = useState<string | false>();
    const [icon, handleIcon] = useState<string | false>();

    const addNotification = useNotifications();

    const t = useTranslations()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const content: PreferencesForm = Object.fromEntries(form.entries());

        const isValid: string | true = validate(content);

        if(isValid !== true) return addNotification({
            type: "ERROR",
            icon: <PriorityHighOutlined />,
            message: t(`Auth.SignUp.form.errors.${isValid}`),
        });

        fetch('/api/user/me', {
            method: 'PUT',
            headers: { 
                'Authorization': `Bearer ${ localStorage.getItem('access_token') || '' }`,
            },
            body: form
        }).then(async res => {
            const data = await res.json();

            if(!res.ok) addNotification({
                type: "ERROR",
                icon: <PriorityHighOutlined />,
                message: data.message
            });

            refetchSession();

            addNotification({
                type: "SUCCESS",
                icon: <CheckCircleOutlineRounded />,
                message: "SUCCESS"
            });
        }).catch((e) => addNotification({
            type: "ERROR",
            icon: <PriorityHighOutlined />,
            message: (e as Error).message
        }));
    }

    return <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .4 }}
            exit={{ opacity: 0 }} 
            className="w-full flex flex-col py-7"
        >
            <h3 className="text-lg font-bold dark:text-white">
                { t('Modules.Preferences.content.information.title') }
            </h3>

            <small className="text-gray-400 dark:text-zinc-400 mb-7">
                { t('Modules.Preferences.content.information.description') }
            </small>

            <form onSubmit={ handleSubmit } className="flex flex-col">
                {/* @ Banner */}
                <input
                    type="file"
                    ref={ bannerRef }
                    style={{ display: 'none' }}
                    name="banner"
                    accept="image/*" 
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if(file) {
                            const reader = new FileReader();

                            reader.onload = () => handleBanner(reader.result as string);
                            reader.readAsDataURL(file);
                        }
                    }}
                />

                {/* @ Icon */}
                <input
                    type="file"
                    ref={ iconRef }
                    name="icon"
                    style={{ display: 'none' }}  
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if(file) {
                            const reader = new FileReader();

                            reader.onload = () => handleIcon(reader.result as string);
                            reader.readAsDataURL(file);
                        }
                    }}
                />

                <div onClick={() => bannerRef.current?.click() } className="w-full cursor-pointer border relative h-24 mb-12 rounded bg-gray-100 dark:bg-zinc-950 dark:border-zinc-900">
                    {
                        banner && <Image
                            src={ banner }
                            layout="fill"
                            alt="Banner"
                            objectFit="cover"
                            className="rounded"
                        />
                    }

                    {
                        bannerRef && banner && <button 
                            className="z-30 absolute top-0 flex items-center gap-2 border border-red-500 text-red-500 bg-red-300/80 px-2 rounded m-2 right-0 text-sm"
                            onClick={(e) => { 
                                handleBanner(false);

                                // @ Stop the parent click event
                                e.stopPropagation()
                            }}
                        >
                            <CancelOutlined 
                                className="text-md text-sm"
                            />

                            Remove
                        </button>
                    }
                    
                    <div onClick={(e) => {
                        iconRef.current?.click()

                        // @ Prevent the parent click event
                        e.stopPropagation()
                    }} className="bg-white dark:bg-zinc-900 border group hover:bg-indigo-500 cursor-pointer select-none hover:border-indigo-500 hover:dark:border-indigo-500 hover:dark:bg-indigo-500 transition-all dark:border-zinc-950 absolute -bottom-8 flex items-center justify-center left-6 rounded-full h-16 w-16">
                        {
                            icon ? <Image
                                src={ icon }
                                layout="fill"
                                alt="Banner"
                                objectFit="cover"
                                className="rounded-full"
                            /> : <FilterCenterFocusOutlined className="text-3xl text-indigo-500 dark:text-indigo-400 group-hover:text-white group-hover:dark:text-zinc-900 transition-all" />
                        }
                    </div>
                </div>
                
                <div className="flex gap-4 flex-wrap items-end">
                    <div className="flex-1">
                        <TextInput
                            label={ t('Modules.Preferences.content.information.name') }
                            type="text"
                            name="name" 
                            className="py-3"
                            required={ true }
                            placeholder="e.g Xavier Morell" 
                        />
                    </div>

                    <div className="flex-1">
                        <TextInput
                            label={ t('Modules.Preferences.content.information.alias') }
                            type="text"
                            name="alias" 
                            className="py-3"
                            placeholder="e.g xavier-morell"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-4 items-end">
                    <div className="flex-1">
                        <Selector 
                            label={ t('Modules.Preferences.content.information.stack') }
                            icon={ <CodeOutlined /> } 
                            required={ true }
                            name="stack"
                            options={[
                                { label: "Frontend", value: "FRONTEND" },
                                { label: "Backend", value: "BACKEND" },
                                { label: "Fullstack", value: "FULLSTACK" },
                            ]}
                        />
                    </div>

                    <div className="flex-1">
                        <Selector 
                            label={ t('Modules.Preferences.content.information.role') }
                            required={ true }
                            icon={ <AutoGraphOutlined /> } 
                            name="role"
                            options={[
                                { label: "Trainee", value: "TRAINEE" },
                                { label: "Junior", value: "JUNIOR" },
                                { label: "Mid", value: "MID" },
                                { label: "Senior", value: "SENIOR" },
                            ]} 
                        />
                    </div>
                </div>

                <button type="submit" className="self-end bg-indigo-500 w-full md:w-auto text-white dark:text-zinc-950 mt-7 px-5 py-2 rounded">
                    { t('Modules.Preferences.content.information.save') }
                </button>
            </form>
    </motion.div> 
}