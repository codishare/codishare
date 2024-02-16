import Content from "@/components/layouts/preferences/content";
import Header from "@/components/layouts/preferences/header"; 
import { ChevronLeftOutlined, SettingsAccessibilityOutlined } from "@mui/icons-material";

export default function Page() {
    return <div className="flex flex-col gap-5 mt-5 items-center self-center w-2/3">
        {/* @ Actions */}
        <section className="flex items-center gap-5 justify-between w-full">
            <button className="p-2 flex items-center gap-3 rounded-lg bg-white border transition-all">
                <ChevronLeftOutlined />

                Go back
            </button>

            <button className="p-2 flex items-center gap-3 rounded-lg border bg-white transition-all">
                <SettingsAccessibilityOutlined />

                Start editing
            </button> 
        </section>

        {/* @ Profile information */}
        <Header />

        {/* @ Content */}
        <Content />
    </div>
}