"use client";
import TrpcProvider from "@/app/_trpc/TrpcProvider";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <TrpcProvider>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
        </TrpcProvider>
    );
};
