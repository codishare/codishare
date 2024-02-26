import { NextRequest, NextResponse } from "next/server";
import handleLocaleRouting, { locales } from "./lib/middlewares/localeMiddleware";
import isAuthorized from "./lib/middlewares/authorized";

export default async function middleware(req: NextRequest) {
    /* @ API Endpoints */
    if(req.nextUrl.pathname.startsWith('/api')) {
        /* @ Auth module */
        if(req.nextUrl.pathname.startsWith('/api/auth')) return NextResponse.next();

        /* @ Token validation */
        const auth = await isAuthorized(req);

        if(!auth) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        return NextResponse.next();
    }

    if(locales.some(locale => req.nextUrl.pathname.startsWith(`/${ locale }`))) {
        /* @ Validate Refresh token */
        const auth = await isAuthorized(req, true);

        /* @ Auth prefix */
        if(!auth && req.nextUrl.pathname.includes('/auth')) return handleLocaleRouting(req);

        /* @ Authorized routes */
        if(!auth) return NextResponse.redirect(new URL('/auth/login', req.url));

        return handleLocaleRouting(req);
    };

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