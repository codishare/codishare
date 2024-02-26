'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import SkeletonUI from "../skeleton";

export const ToggleTheme = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if(!mounted) return <SkeletonUI className="h-10 w-10" />

    return <button
        className="flex items-center p-2 rounded-lg border dark:border-zinc-900 transition-all"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
        {theme === "dark" ? (
            <LightModeOutlinedIcon />
        ) : (
            <NightlightOutlinedIcon />
        )}
    </button>
};
