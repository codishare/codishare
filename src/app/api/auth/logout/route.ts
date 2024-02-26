import { removeToken } from "@/lib/services/api/jwt";
import { extractAccessToken } from "@/lib/services/api/request";
import { deleteCookie, getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const access_token: any = extractAccessToken(req); 

        const refresh_token = getCookie('refresh-token', { req });

        await removeToken([refresh_token, access_token]);

        const response = new NextResponse(
            JSON.stringify({ 
                redirect: '/auth/login', 
                message: "success"  
            }),
            {
                status: 200
            }
        );

        deleteCookie('refresh-token', { res: response });

        return response;
    } catch (error) {
        console.error((error as Error).message);

        return NextResponse.json({
            message: "server_error"
        }, {
            status: 500
        })
    }
}