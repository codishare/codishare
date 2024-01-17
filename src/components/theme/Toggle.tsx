'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ToogleTheme = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true));

    if (!mounted) return null;

    return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {
            theme == 'dark' ? '🌞' : '🌙'
        }
    </button>
}