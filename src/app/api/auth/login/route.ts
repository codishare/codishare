import { NextResponse } from "next/server";
import type { Login } from "@/types/auth/_types";
import login, { generateSuccess } from "@/lib/services/api/auth/login";

export async function POST(req: Request) {
    try {
        const data = (await req.json()) as Login;

        // @ Attempt login
        const response = await login(req, data); 

        if(response instanceof NextResponse) return response; 

        // @ Generate cookie and return response
        return generateSuccess(req, response);
    } catch (error) {
        console.error((error as Error).message);

        return NextResponse.json(
            {
                message: "server_error",
            },
            {
                status: 500,
            }
        );
    }
}
