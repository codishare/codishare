import { decodeToken, verifyToken } from "@/services/api/jwt";
import { getUserById } from "@/services/api/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const {
            searchParams
        } = new URL(req.url); 

        const access_token = searchParams.get("access_token");
        
        if(!access_token || !await verifyToken(access_token)) return NextResponse.json({
            message: "invalid_access_token"
        }, {
            status: 401
        })
    
        const decoded = await decodeToken(access_token);

        if(!decoded || !decoded.userId) return NextResponse.json({
            message: "invalid_access_token"
        }, {
            status: 401
        })

        const {
            userId 
        } = decoded; 

        const user = await getUserById(userId as number);

        if(!user) return NextResponse.json({
            message: "user_not_found"
        }, {
            status: 404
        })

        return NextResponse.json({
            user
        }, {
            status: 200
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