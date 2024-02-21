import Selector from "@/components/ui/selector";
import TextInput from "@/components/ui/text-input";
import { useNotifications } from "@/lib/hooks/useNotifications";
import validate from "@/services/validation/forms/preferences";
import { AutoGraphOutlined, CodeOutlined, FilterCenterFocusOutlined } from "@mui/icons-material";
import PriorityHighOutlined from "@mui/icons-material/PriorityHighOutlined";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Information() {
    const iconRef = useRef<HTMLInputElement>(null);
    const bannerRef = useRef<HTMLInputElement>(null);

    const [banner, handleBanner] = useState<string | null>(null);
    const [icon, handleIcon] = useState<string | null>(null);

    const addNotification = useNotifications();

    const t = useTranslations()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid: string | true = validate(new FormData(e.currentTarget));

        if(isValid !== true) return addNotification({
            type: "ERROR",
            icon: <PriorityHighOutlined />,
            message: t(`Auth.SignUp.form.errors.${isValid}`),
        });
    }

    return <div className="w-full flex flex-col py-7">
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
                name="banner"
                style={{ display: 'none' }}
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
    </div>
}