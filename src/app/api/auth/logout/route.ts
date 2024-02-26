import { removeToken } from "@/lib/services/api/jwt";
import { extractAccessToken } from "@/lib/services/api/request";
import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const access_token: any = extractAccessToken(req); 

        const refresh_token = getCookie('refresh-token', { req });

        await removeToken([refresh_token, access_token]);

        return NextResponse.json({
            message: "success"
        }, {
            status: 200
        })
    } catch (error) {
        console.error((error as Error).message);

        return NextResponse.json({
            message: "server_error"
        }, {
            status: 500
        })
    }
}