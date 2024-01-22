import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { Providers } from "@/components/providers";
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from "next-intl";

const inter = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Codishare",
    description:
        "Elevate your coding experience sharing your code with others.",
};

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'de' }]
}

export default async function RootLayout({
    children,
    params: {
        locale
    }
}: {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}) {
    let messages; 

    try {
        messages = (await import(`../../../messages/${ locale }.json`)).default; 
    } catch (error) {
        console.error("Failed to load messages: ", error);

        notFound(); 
    }

    return (
        <html>
            <body className={inter.className}>
                <Providers>
                    <NextIntlClientProvider locale={ locale } messages={ messages }>
                        { children }
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}
