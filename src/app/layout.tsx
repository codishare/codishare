import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TrpcProvider from "./_trpc/TrpcProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Codishare",
    description:
        "Elevate your coding experience sharing your code with others.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TrpcProvider>{children}</TrpcProvider>
            </body>
        </html>
    );
}
