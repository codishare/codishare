"use client";
import TrpcProvider from "@/app/_trpc/TrpcProvider";
import { ThemeProvider } from "next-themes";
import NotificationProvider from "./notifications";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <TrpcProvider>
            <ThemeProvider attribute="class">
                <NotificationProvider>
                    { children }
                </NotificationProvider>
            </ThemeProvider>
        </TrpcProvider>
    );
};
