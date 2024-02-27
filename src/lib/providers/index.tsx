"use server";

import TrpcProvider from "@/app/_trpc/TrpcProvider";
import { ThemeProvider } from "next-themes";
import NotificationProvider from "./notifications"; 
import SessionProvider from './auth'
import { getServerSession } from "next-auth";

export const Providers = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession()

    return (
        <TrpcProvider>
            {/* <ThemeProvider attribute="class"> */}
                <SessionProvider
                    session={ session }
                > 
                    { children } 
                </SessionProvider>
            {/* </ThemeProvider> */}
        </TrpcProvider>
    );
};
