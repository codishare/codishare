import Actions from "@/components/layouts/preferences/actions";
import Header from "@/components/layouts/preferences/header";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col gap-5 mt-5 items-center self-center w-full px-3 lg:px-0 lg:w-2/3 mb-10">
        {/* Back & View actions */}
        <Actions />

        {/* Session information */}
        <Header />

        {/* Preferences content */}
        { children }
    </div>
}