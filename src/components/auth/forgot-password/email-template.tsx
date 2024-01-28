import * as React from "react";
import { User } from "@prisma/client";

const GetLocation = () => {
    return process.env.VERCEL_URL || "http://localhost:3000";
};

export const EmailTemplate = (
    user: User,
    resetPasswordToken: string,
    locale: string
) => (
    <div>
        <h1>Hi {user.name},</h1>
        <p>
            Someone requested a password reset for your account. If this was
            you, you can reset your password by clicking the link below. If you
            did not request a password reset, you can safely ignore this email.
        </p>
        <a
            href={`${GetLocation()}/${
                locale || "en"
            }/auth/reset-password?token=${resetPasswordToken}`}
        >
            Reset Password
        </a>
    </div>
);
