import { NextResponse } from "next/server"; 
import register from "@/lib/services/api/auth/register";
import { SignUp } from "@/types/auth/_types";
import login, { generateSuccess } from "@/lib/services/api/auth/login";

export async function POST(
    req: Request
) {
    try {
        const data = await req.json() as SignUp; 

        // @ Attempt register account
        const response = await register(data)

        if(response instanceof NextResponse) return response

        // @ Attempt login into generated account
        const attemp = await login(req, {
            email: data.email,
            password: data.password
        })

        if(attemp instanceof NextResponse) return attemp

        // @ Generate cookie and return response
        return generateSuccess(req, attemp)
    } catch (error) {
        console.error((error as Error).message)

        return NextResponse.json({
            message: "server_error"
        }, {
            status: 500
        })
    }
}