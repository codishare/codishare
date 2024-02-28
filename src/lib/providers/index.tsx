'use client'

import TrpcProvider from "@/app/_trpc/TrpcProvider";  
import AuthProvider from "./auth"; 
import { ThemeProvider } from "next-themes";
import NotificationProvider from "./notifications";

export const Providers = async ({ children }: { children: React.ReactNode }) => { 
    return (
        <TrpcProvider> 
            <ThemeProvider attribute="class">
                <NotificationProvider>
                    <AuthProvider> 
                        { children } 
                    </AuthProvider> 
                </NotificationProvider>
            </ThemeProvider>
        </TrpcProvider>
    );
};
