import { NextRequest, NextResponse } from "next/server";
import handleLocaleRouting, { locales } from "./lib/middlewares/localeMiddleware";
import isAuthorized from "./lib/middlewares/authorized";

export default async function middleware(req: NextRequest) {
    /* @ API Endpoints */
    if(req.nextUrl.pathname.startsWith('/api')) {
        /* @ Auth module */
        if(req.nextUrl.pathname.startsWith('/api/auth')) return NextResponse.next();

        /* @ Token validation */
        return isAuthorized(req);
    }

    /* @ Locales validation */
    locales.map(locale => {
        if(req.nextUrl.pathname.startsWith(`/${ locale }`)) return handleLocaleRouting(req);

        /* @ Authorized routes */
    })

    return handleLocaleRouting(req)
}

export const config = {
    /*
     * To prevent middleware from running on static files.
     * static files have a (.) in the path, while dynamic files do not.
     * Match all files that does not contain a (.)
     */
    matcher: ['/((?!.*\\.).*)'],
}