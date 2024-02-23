import { validate } from "@/lib/services/shared/auth/reset-password";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/encryption";

export async function POST(req: Request) {
    const { password, confirm_password, token } = (await req.json()) as {
        password: string;
        confirm_password: string;
        token: string;
    };

    const isValid = validate({ password, confirm_password });

    if (isValid !== true)
        return NextResponse.json(
            {
                message: isValid,
            },
            {
                status: 400,
            }
        );

    const existingToken = await prisma.resetPasswordToken.findFirst({
        where: {
            token,
        },
    });

    if (!existingToken)
        return NextResponse.json(
            {
                message: "invalid_token",
            },
            {
                status: 400,
            }
        );

    const user = await prisma.user.findFirst({
        where: {
            id: existingToken.userId,
        },
    });

    if (!user)
        return NextResponse.json(
            {
                message: "invalid_token",
            },
            {
                status: 400,
            }
        );

    await prisma.resetPasswordToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: encrypt(password),
        },
    });

    return NextResponse.json(
        {
            message: "success",
        },
        {
            status: 200,
        }
    );
}
