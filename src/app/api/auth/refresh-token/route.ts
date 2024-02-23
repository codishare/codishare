import {
    decodeToken,
    generateAccessToken,
    verifyToken,
} from "@/lib/services/api/jwt";
import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const refresh_token = getCookie("refresh-token", { req });

    if (!refresh_token)
        return NextResponse.json(
            {
                message: "invalid_refresh_token",
            },
            {
                status: 401,
            }
        );

    const validateRefreshToken = await verifyToken(refresh_token);

    if (!validateRefreshToken)
        return NextResponse.json(
            {
                message: "invalid_refresh_token",
            },
            {
                status: 401,
            }
        );

    try {
        const decoded = await decodeToken(refresh_token);

        if (!decoded)
            return NextResponse.json(
                {
                    message: "invalid_refresh_token",
                },
                {
                    status: 401,
                }
            );

        const { userId } = decoded;

        if (!userId)
            return NextResponse.json(
                {
                    message: "invalid_refresh_token",
                },
                {
                    status: 401,
                }
            );

        const accessToken = await generateAccessToken(userId as Number);

        return NextResponse.json(
            {
                access_token: accessToken,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                redirect: "/auth/login",
                message: "server_error",
            },
            {
                status: 500,
            }
        );
    }
}
