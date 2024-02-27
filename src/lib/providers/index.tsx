'use client'

import TrpcProvider from "@/app/_trpc/TrpcProvider";  
import AuthProvider from "./auth"; 
import { ThemeProvider } from "next-themes";

export const Providers = async ({ children }: { children: React.ReactNode }) => { 
    return (
        <TrpcProvider> 
            <ThemeProvider attribute="class">
                <AuthProvider> 
                    { children } 
                </AuthProvider> 
            </ThemeProvider>
        </TrpcProvider>
    );
};
