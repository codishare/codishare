import SkeletonUI from "@/components/ui/skeleton";
import { DashboardCustomizeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useTheme } from "next-themes";

export default function Theme() {
    const {
        theme, setTheme
    } = useTheme();

    return <article>
        {/* @ Header */}
        <section className="flex mt-5 items-center justify-between flex-col md:flex-row gap-4">
            <div>
                <h3 className="text-lg font-bold">
                    Color scheme
                </h3>

                <small className="text-gray-400">
                    Choose a color scheme for the application
                </small>
            </div>

            <div className="flex border divide-x dark:divide-zinc-900 dark:border-zinc-900 rounded">
                <button onClick={() => setTheme('system')} className={ `py-3 px-5 text-sm flex items-center gap-2 rounded-l ${ theme == 'system' ? 'bg-indigo-500 text-white dark:text-zinc-900' : '' }` }>
                    <LightModeOutlined className="text-sm" />

                    System
                </button>

                <button onClick={() => setTheme('light')} className={ `py-3 px-5 text-sm flex items-center gap-2 rounded-r ${ theme != 'system' ? 'bg-indigo-500 text-white dark:text-zinc-900' : '' }` }>
                    <DashboardCustomizeOutlined className="text-sm" />
                    
                    Custom
                </button>
            </div>
        </section>

        {/* @ Themes */}
        <section className="flex items-center gap-5 mt-5 flex-col md:flex-row">
            {/* @ Light */}
            <article onClick={() => setTheme('light')} className="border p-5 bg-white cursor-pointer group hover:border-indigo-500 transition-all rounded-md flex-1">
                <h3 className="text-lg font-bold">
                    <SkeletonUI className="w-20 h-5 group-hover:bg-indigo-500 transition-all" />
                </h3>

                <small className="text-gray-400">
                    <SkeletonUI className="w-40 h-3 group-hover:bg-indigo-500 transition-all" />
                </small>

                <SkeletonUI className="w-40 h-10 rounded-md group-hover:bg-indigo-500 transition-all" />

                <div className="flex gap-3">
                    <SkeletonUI className="w-10 h-10 rounded-md group-hover:bg-indigo-500 transition-all" />
                    <SkeletonUI className="w-10 h-10 rounded-md group-hover:bg-indigo-500 transition-all" />
                    <SkeletonUI className="w-10 h-10 rounded-md group-hover:bg-indigo-500 transition-all" />
                    <SkeletonUI className="w-10 h-10 rounded-md group-hover:bg-indigo-500 transition-all" />
                </div>
            </article>

            {/* @ Dark */}
            <article onClick={() => setTheme('dark')} className="border cursor-pointer group hover:border-indigo-500 transition-all border-zinc-600 p-5 rounded-md bg-zinc-700 flex-1">
                <h3 className="text-lg font-bold">
                    <SkeletonUI className="w-20 bg-gray-500 h-5 group-hover:bg-indigo-500 transition-all" />
                </h3>

                <small className="text-gray-400">
                    <SkeletonUI className="w-40 bg-gray-500 h-3 group-hover:bg-indigo-500 transition-all" />
                </small>

                <SkeletonUI className="w-40 h-10 bg-gray-500 rounded-md group-hover:bg-indigo-500 transition-all" />

                <div className="flex gap-3">
                    <SkeletonUI className="w-10 bg-gray-500 h-10 rounded-md group-hover:bg-indigo-500 transition-all" />
                    <SkeletonUI className="w-10 bg-gray-500 h-10 rounded-md group-hover:bg-indigo-500 transition-all" />
                    <SkeletonUI className="w-10 bg-gray-500 h-10 rounded-md group-hover:bg-indigo-500 transition-all" />
                    <SkeletonUI className="w-10 bg-gray-500 h-10 rounded-md group-hover:bg-indigo-500 transition-all" />
                </div>
            </article>
        </section>
    </article>
}