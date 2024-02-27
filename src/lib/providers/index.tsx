"use server";

import TrpcProvider from "@/app/_trpc/TrpcProvider"; 
import { getServerSession } from "next-auth";
import AuthProvider from "./auth";

export const Providers = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession()

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
