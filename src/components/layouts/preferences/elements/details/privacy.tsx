export default function Privacy() {
    return <div className="w-full flex items-center flex-wrap gap-4 justify-between py-7">
        <section className="flex flex-col">
            <h3 className="text-lg font-bold dark:text-white">
                Privacy
            </h3>

            <small className="text-gray-400">
                Does your profile will be public to everyone?
            </small>
        </section>

        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-zinc-950 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"></div>
        </label>
    </div>
}