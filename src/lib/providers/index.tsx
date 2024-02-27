"use server";

import TrpcProvider from "@/app/_trpc/TrpcProvider";  
import AuthProvider from "./auth";

export const Providers = async ({ children }: { children: React.ReactNode }) => { 
    return (
        <TrpcProvider>
            {/* <ThemeProvider attribute="class"> */}
                <AuthProvider> 
                    { children } 
                </AuthProvider>
            {/* </ThemeProvider> */}
        </TrpcProvider>
    );
};
