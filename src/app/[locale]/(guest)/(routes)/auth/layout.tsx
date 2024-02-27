export default function Layout({
    children
} : {
    children: React.ReactNode
}) {
    return <main className="w-screen h-screen flex justify-center"> 
        <section className="hidden lg:flex lg:w-1/2 xl:w-1/3 bg-gray-100/80 dark:bg-black/30 relative items-center justify-center transition-all">
            <div className="absolute h-screen w-1/2 bg-indigo-500 left-0"></div>

            <img className="z-30" src="/assets/sharing-auth.png" />
        </section>

        {/* @ Content */}
        <section className="flex-none md:flex-1 w-[90%] flex justify-center items-center">
            {children}
        </section>
    </main>
}