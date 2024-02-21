import { decodeToken, verifyToken } from "@/services/api/jwt";
import { extractAccessToken } from "@/services/api/request";
import { getUserById } from "@/services/api/user";
import validate from "@/services/validation/forms/preferences";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try { 
        const access_token = extractAccessToken(req); 

        if (!access_token || !(await verifyToken(access_token)))
            return NextResponse.json(
                {
                    message: "invalid_access_token",
                },
                {
                    status: 401,
                }
            );

        const decoded = await decodeToken(access_token);

        if (!decoded || !decoded.userId)
            return NextResponse.json(
                {
                    message: "invalid_access_token",
                },
                {
                    status: 401,
                }
            );

        const { userId } = decoded;

        const user = await getUserById(userId as number);

        if (!user)
            return NextResponse.json(
                {
                    message: "user_not_found",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(user, {
            status: 200,
        });
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

export async function PUT(req: Request) {
    const access_token = extractAccessToken(req)

    const data = await req.json();

    if (!access_token || !(await verifyToken(access_token)))
        return NextResponse.json(
            {
                message: "invalid_access_token",
            },
            {
                status: 401,
            }
        );

    const decoded = await decodeToken(access_token);

    if (!decoded || !decoded.userId)
        return NextResponse.json(
            {
                message: "invalid_access_token",
            },
            {
                status: 401,
            }
        );

    const { userId } = decoded;

    const isValid = validate(data);

    if (isValid !== true)
        return NextResponse.json(
            {
                message: isValid,
            },
            {
                status: 400,
            }
        );

    return NextResponse.json({
        message: "success",
        access_token,
        userId,
        data
    }, {
        status: 200
    })
}