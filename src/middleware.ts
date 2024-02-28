import { NextRequest, NextResponse } from "next/server";
import handleLocaleRouting from "./lib/middlewares/localeMiddleware";    

export default async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname.startsWith('/api')) return NextResponse.next();

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