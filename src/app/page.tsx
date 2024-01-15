"use client";
import { useTheme } from "next-themes";

export default function Page() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-col items-start">
            <div>The current theme is: {theme}</div>
            <button onClick={() => setTheme("light")}>Light Mode</button>
            <button onClick={() => setTheme("dark")}>Dark Mode</button>
            <button onClick={() => setTheme("system")}>System Mode</button>
        </div>
    );
}
