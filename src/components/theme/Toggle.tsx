import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import Skeleton from "../ui/skeleton";

export const ToggleTheme = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return mounted ? (
        <button
            className="flex items-center p-2 rounded-lg border transition-all"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? (
                <LightModeOutlinedIcon />
            ) : (
                <NightlightOutlinedIcon />
            )}
        </button>
    ) : (
        <Skeleton className="w-8 h-8" />
    );
};
