'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";  

export const ToggleTheme = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if(!mounted) return 'Loading theme...' 

    return <button
        className="flex items-center p-2 rounded-lg border dark:border-zinc-900 transition-all"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
        {resolvedTheme === "dark" ? (
            <LightModeOutlinedIcon />
        ) : (
            <NightlightOutlinedIcon />
        )}
    </button>
};