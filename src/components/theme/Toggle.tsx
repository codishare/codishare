import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ToggleTheme = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true));

    if (!mounted) return null;

    return <button className="flex items-center p-2 rounded-lg border transition-all" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <img 
            src={ `/assets/icons/${ theme }_mode.svg` }
            className="h-5 w-5"
        />
    </button>
}