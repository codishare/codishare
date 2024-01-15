import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Codishare",
    description:
        "Elevate your coding experience sharing your code with others.",
};

export default function RootLayout({
    children, params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    return (
        <html lang={ locale }>
            <body className={ inter.className }>
                <Providers>{ children }</Providers>
            </body>
        </html>
    );
}
