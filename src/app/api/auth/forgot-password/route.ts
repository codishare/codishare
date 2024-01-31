import { NextResponse } from "next/server";
import { isEmail } from "@/services/validation/email";
import prisma from "@/lib/prisma";
import resend from "@/lib/resend";
import { EmailTemplate } from "@/components/auth/forgot-password/email-template";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { email, locale } = await req.json();

        if (!isEmail(email))
            return NextResponse.json(
                {
                    message: "email_format",
                },
                {
                    status: 400,
                }
            );

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user)
            return NextResponse.json(
                {
                    message: "user_not_found",
                },
                {
                    status: 404,
                }
            );

        const existingToken = await prisma.resetPasswordToken.findFirst({
            where: {
                userId: user.id,
            },
        });

        if (existingToken)
            await prisma.resetPasswordToken.delete({
                where: {
                    id: existingToken.id,
                },
            });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        await prisma.resetPasswordToken.create({
            data: {
                userId: user.id,
                token: resetPasswordToken,
                expiresAt: new Date(passwordResetExpires),
            },
        });

        const { data, error } = await resend.emails.send({
            from: "Codishare <onboarding@resend.dev>",
            to: [user.email],
            subject: "Reset your password",
            react: EmailTemplate(user, resetPasswordToken, locale),
        });

        if (error) {
            console.log((error as Error).message)

            return NextResponse.json(
                {
                    message: "server_error",
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json(
            {
                message: "success",
            },
            {
                status: 200,
            }
        );
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
