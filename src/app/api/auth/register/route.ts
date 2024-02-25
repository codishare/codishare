import { NextResponse } from "next/server"; 
import register from "@/lib/services/api/auth/register";

export async function POST(
    req: Request
) {
    try {
        const response = await register(req)

        if(response instanceof NextResponse) return response

        return NextResponse.json({
            message: 'account_created'
        }, {
            status: 201
        })
    } catch (error) {
        console.error((error as Error).message)

        return NextResponse.json({
            message: "server_error"
        }, {
            status: 500
        })
    }
}