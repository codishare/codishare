import { NextResponse } from "next/server";
import type { Login } from "@/_types";
import { validate } from "@/services/validation/forms/login";
import { validateCredentials } from "@/services/api/user";
import { performUserAgent } from "@/services/api/request";
import { setCookie } from "cookies-next";
import { generateAccessToken, generateRefreshToken } from "@/services/api/jwt";

export async function POST(req: Request) {
    try {
        const data = (await req.json()) as Login;

        const isValid = validate(data);

        if (isValid !== true) return NextResponse.json(
            {
                message: isValid,
            },
            {
                status: 400,
            }
        );

        const { email, password } = data;

        const user = await validateCredentials(email, password);

        if (!user) return NextResponse.json(
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
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res;
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
