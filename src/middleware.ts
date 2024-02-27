import { NextRequest, NextResponse } from "next/server";
import handleLocaleRouting, { locales } from "./lib/middlewares/localeMiddleware";    

export default async function middleware(req: NextRequest) {
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