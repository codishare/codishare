import { NextResponse, userAgent } from "next/server";
import type { Login } from "@/_types";
import { validate } from "@/services/validation/forms/login";
import { validateCredentials } from "@/services/api/user";
import { getClientIp, performUserAgent } from "@/services/api/request";

export async function POST(
    req: Request
) {
    try {
        const data = await req.json() as Login; 

        const isValid = validate(data);

        if(isValid !== true) return NextResponse.json({
            message: isValid
        }, {
            status: 400
        })

        const {
            email, 
            password
        } = data; 

        const user = await validateCredentials(email, password); 

        if(!user) return NextResponse.json({
            message: "invalid_credentials"
        }, {
            status: 400
        })

        await performUserAgent(req);

        const res = new NextResponse(
            JSON.stringify({
                message: "success", 
                agent: userAgent(req), 
                client_ip: getClientIp(req)
            }), {
                status: 200
            }
        )

        return res; 
    } catch (error) {
        console.error((error as Error).message)

        return NextResponse.json({
            message: "server_error"
        }, {
            status: 500
        })
    }
}