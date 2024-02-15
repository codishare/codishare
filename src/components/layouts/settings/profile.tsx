import { AdminPanelSettingsOutlined } from "@mui/icons-material";

export default function Profile() {
    return <li
        className="flex gap-3 items-center cursor-pointer bg-zinc-100 dark:bg-zinc-800 text-sm p-2.5 hover:bg-indigo-500 hover:text-white transition rounded-lg"
    >
        <AdminPanelSettingsOutlined />

        Profile
    </li>
}