import SkeletonUI from "@/components/ui/skeleton";
import { DashboardCustomizeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export default function Theme() {
    const {
        theme, setTheme
    } = useTheme();

    const t = useTranslations('Modules.Preferences.content.theme');

    return <article className="w-full">
        {/* @ Header */}
        <section className="flex mt-5 items-center justify-between flex-col md:flex-row gap-4">
            <div className="w-full">
                <h3 className="text-lg font-bold dark:text-white">
                    { t('title') }
                </h3>

                <small className="text-gray-400">
                    { t('description') }
                </small>
            </div>

            <div className="flex border divide-x dark:divide-zinc-950 dark:border-zinc-950 rounded w-full md:w-auto">
                <button onClick={() => setTheme('system')} className={ `py-3 px-5 flex-1 md:flex-none text-sm flex items-center gap-2 rounded-l ${ theme == 'system' ? 'bg-indigo-500 text-white dark:text-zinc-900' : '' }` }>
                    <LightModeOutlined className="text-sm" />

                    { t('system') }
                </button>

                <button onClick={() => setTheme('light')} className={ `py-3 px-5 flex-1 md:flex-none text-sm flex items-center gap-2 rounded-r ${ theme != 'system' ? 'bg-indigo-500 text-white dark:text-zinc-900' : '' }` }>
                    <DashboardCustomizeOutlined className="text-sm" />
                    
                    { t('custom') }
                </button>
            </div>
        </section>

        {/* @ Themes */}
        <section className="flex items-center gap-5 mt-5 flex-col md:flex-row">
            {/* @ Light */}
            <article onClick={() => setTheme('light')} className={ `border p-5 bg-white cursor-pointer group hover:border-indigo-500 transition-all rounded-md w-full md:w-auto md:flex-1 ${ theme == 'light' ? 'border-green-500' : '' }` }>
                <h3 className="text-lg font-bold">
                    <SkeletonUI className={ `w-20 h-5 group-hover:bg-indigo-500 transition-all ${ theme == 'light' ? 'bg-green-500' : '' }` } />
                </h3>

                <small className="text-gray-400">
                    <SkeletonUI className={ `w-40 h-3 group-hover:bg-indigo-500 transition-all ${ theme == 'light' ? 'bg-green-500' : '' }` } />
                </small>

                <SkeletonUI className={ `w-40 h-10 rounded-md group-hover:bg-indigo-500 transition-all ${ theme == 'light' ? 'bg-green-500' : '' }` } />

                <div className="flex gap-3">
                    <SkeletonUI className={ `w-10 h-10 rounded-md group-hover:bg-indigo-500 transition-all ${ theme == 'light' ? 'bg-green-500' : '' }` } />
                    <SkeletonUI className={ `w-10 h-10 rounded-md group-hover:bg-indigo-500 transition-all ${ theme == 'light' ? 'bg-green-500' : '' }` } />
                    <SkeletonUI className={ `w-10 h-10 rounded-md group-hover:bg-indigo-500 transition-all ${ theme == 'light' ? 'bg-green-500' : '' }` } />
                    <SkeletonUI className={ `w-10 h-10 rounded-md group-hover:bg-indigo-500 transition-all ${ theme == 'light' ? 'bg-green-500' : '' }` } />
                </div>
            </article>

            {/* @ Dark */}
            <article onClick={() => setTheme('dark')} className={ `border cursor-pointer group hover:border-indigo-500 transition-all border-zinc-600 p-5 rounded-md bg-zinc-700 w-full md:w-auto md:flex-1 ${ theme == 'dark' ? 'border-green-500' : '' }` }>
                <h3 className="text-lg font-bold">
                    <SkeletonUI className={ `w-20 bg-gray-500 h-5 group-hover:bg-indigo-500 transition-all ${ theme == 'dark' ? 'bg-green-500' : '' }` } />
                </h3>

                <small className="text-gray-400">
                    <SkeletonUI className={ `w-40 bg-gray-500 h-3 group-hover:bg-indigo-500 transition-all ${ theme == 'dark' ? 'bg-green-500' : '' }` } />
                </small>

                <SkeletonUI className={ `w-40 h-10 bg-gray-500 rounded-md group-hover:bg-indigo-500 transition-all ${ theme == 'dark' ? 'bg-green-500' : '' }` } />

                <div className="flex gap-3">
                    <SkeletonUI className={ `w-10 bg-gray-500 h-10 rounded-md group-hover:bg-indigo-500 transition-all ${ theme == 'dark' ? 'bg-green-500' : '' }` } />
                    <SkeletonUI className={ `w-10 bg-gray-500 h-10 rounded-md group-hover:bg-indigo-500 transition-all ${ theme == 'dark' ? 'bg-green-500' : '' }` } />
                    <SkeletonUI className={ `w-10 bg-gray-500 h-10 rounded-md group-hover:bg-indigo-500 transition-all ${ theme == 'dark' ? 'bg-green-500' : '' }` } />
                    <SkeletonUI className={ `w-10 bg-gray-500 h-10 rounded-md group-hover:bg-indigo-500 transition-all ${ theme == 'dark' ? 'bg-green-500' : '' }` } />
                </div>
            </article>
        </section>
    </article>
}