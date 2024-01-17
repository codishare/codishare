'use client';

import { useTheme } from "next-themes";

export const ToogleTheme = () => {
    const { theme, setTheme } = useTheme();


    return (
        <div className="flex flex-col justify-center">
        <p>
        Current theme: {theme}
        </p>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Toggle Theme
        </button>
    </div>
    )
}