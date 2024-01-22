import { NextResponse } from "next/server";
import type { SignUp } from "@/_types";
import { validate } from "@/services/validation/forms/sign-up";
import { countUsers, isEmailInUse } from "@/services/api/user";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/encryption";

export async function POST(
    req: Request
) {
    try {
        const data = await req.json() as SignUp; 

        const isValid = validate(data);

        if(isValid !== true) return NextResponse.json({
            message: isValid
        }, {
            status: 400
        })

        const {
            name, 
            email, 
            password, 
            stack, 
            role
        } = data; 

        if(await isEmailInUse(email)) return NextResponse.json({
            message: 'email_in_use'
        }, {
            status: 400
        })

        await prisma.user.create({
            data: {
                name, 
                email, 
                password: encrypt(password),
                role: await countUsers() === 0 ? 'ADMIN' : 'USER'
            }
        })

        return NextResponse.json({
            message: 'account_created'
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            message: (error as Error).message
        }, {
            status: 500
        })
    }
}