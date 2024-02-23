import { removeToken, verifyToken } from "@/lib/services/api/jwt";
import { extractAccessToken } from "@/lib/services/api/request";
import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const access_token = extractAccessToken(req); 
        
        if(!access_token || !await verifyToken(access_token)) return NextResponse.json({
            message: "invalid_access_token"
        }, {
            status: 401
        })

        const refresh_token = getCookie('refresh-token', { req });

        if(!refresh_token || !await verifyToken(refresh_token)) return NextResponse.json({
            message: "invalid_refresh_token"
        }, {
            status: 401
        })

        const removed = await removeToken([refresh_token, access_token]);
        
        if(!removed) return NextResponse.json({
            message: "error_removing_tokens"
        }, {
            status: 401
        })

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