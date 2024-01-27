"use client";

import TrpcProvider from "@/app/_trpc/TrpcProvider";
import { ThemeProvider } from "next-themes";
import NotificationProvider from "./notifications";
import SessionProvider from "./session";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <TrpcProvider>
            <ThemeProvider attribute="class">
                <SessionProvider>
                    <NotificationProvider>
                        { children }
                    </NotificationProvider>
                </SessionProvider>
            </ThemeProvider>
        </TrpcProvider>
    );
};
