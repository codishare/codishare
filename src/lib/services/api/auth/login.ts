import { Login } from "@/types/auth/_types";
import { NextResponse } from "next/server";
import { validate } from "@/lib/services/shared/layouts/auth/login";
import { validateCredentials } from "@/lib/services/api/auth/user";
import { performUserAgent } from "@/lib/services/api/request";
import { generateAccessToken, generateRefreshToken } from "@/lib/services/api/jwt";
import { setCookie } from "cookies-next";

export default async function login(req: Request, data: Login) {
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

    const { email, password } = data;

    const user = await validateCredentials(email, password);

    if (!user)
        return NextResponse.json(
            {
                message: "invalid_credentials",
            },
            {
                status: 400,
            }
        );

    await performUserAgent(req, user.id);

    const accessToken = await generateAccessToken(user.id);
    const refreshToken = await generateRefreshToken(req, user.id);

    return { accessToken, refreshToken }
}

export function generateSuccess(req: Request, {
    accessToken, 
    refreshToken
}: {
    accessToken: string, 
    refreshToken: string
}) {
    if(!accessToken || !refreshToken) return NextResponse.json(
        {
            message: "server_error",
        },
        {
            status: 500,
        }
    );

    const res = new NextResponse(
        JSON.stringify({
            message: "success",
            access_token: accessToken,
        }),
        {
            status: 200,
        }
    );

    setCookie("refresh-token", refreshToken, {
        req,
        res,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res;
}