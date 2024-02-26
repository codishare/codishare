import { NextRequest, NextResponse } from "next/server";
import { extractAccessToken } from "../services/api/request"; 
import { jwtVerify } from "jose";
import { getJwtSecretKey } from "../jwt-secret";

export default async function isAuthorized(req: NextRequest) {
    try {
        const access_token = extractAccessToken(req); 
    
        if (!access_token)
            return NextResponse.json(
                {
                    message: "invalid_access_token",
                    entry: 'middleware'
                },
                {
                    status: 401,
                }
            );

        try {
            await jwtVerify(access_token, new TextEncoder().encode(getJwtSecretKey()));
            
            return NextResponse.next();
        } catch (error) {
            if ((error as Error).name === 'TokenExpiredError') return NextResponse.json(
                {
                    message: "expired_access_token",
                    entry: 'middleware'
                },
                {
                    status: 401,
                }
            );

            return NextResponse.json(
                {
                    message: "invalid_access_token",
                    entry: 'middleware'
                },
                {
                    status: 401,
                }
            );
        } 
    } catch (error) {
        return NextResponse.json(
            {
                message: "server_error",
                entry: 'middleware', 
                error: (error as Error).message
            },
            {
                status: 500,
            }
        );
    }
}