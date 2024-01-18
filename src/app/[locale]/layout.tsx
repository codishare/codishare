import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { Providers } from "@/components/providers";

const inter = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Codishare",
    description:
        "Elevate your coding experience sharing your code with others.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
