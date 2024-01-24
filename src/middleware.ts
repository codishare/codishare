import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
export const locales = ["en", "es"];

const localeMiddleware = createIntlMiddleware({
    locales: locales,
    defaultLocale: "en"
})

export default function middleware(req: NextRequest) {
    localeMiddleware(req); 
};

export const config = {
    matcher: ["/", `/(en|es)/:path*`],
};
