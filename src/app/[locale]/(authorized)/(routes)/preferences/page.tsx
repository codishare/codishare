import Content from "@/components/layouts/preferences/content";
import Header from "@/components/layouts/preferences/header"; 
import { Link } from "@/navigation";
import { ChevronLeftOutlined, RocketLaunchOutlined } from "@mui/icons-material";

export default function Page() {
    return <div className="flex flex-col gap-5 mt-5 items-center self-center w-full px-5 lg:px-0 lg:w-2/3 mb-10">
        {/* @ Actions */}
        <section className="flex items-center gap-5 justify-between w-full">
            <Link 
                href="/"
                className="p-2 flex items-center gap-3 rounded-lg bg-white border transition-all"
            >
                <ChevronLeftOutlined />

                Go back
            </Link>

            <button className="p-2 flex items-center gap-3 rounded-lg border bg-white transition-all">
                <RocketLaunchOutlined />

                View profile
            </button> 
        </section>

        {/* @ Profile information */}
        <Header />

        {/* @ Content */}
        <Content />
    </div>
}