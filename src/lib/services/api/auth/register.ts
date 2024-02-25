import { countUsers, isEmailInUse } from "@/lib/services/api/auth/user";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/encryption";
import { Seniority, Stack, User } from "@prisma/client";
import { NextResponse } from "next/server";
import { SignUp } from "@/types/auth/_types";
import { validate } from "../../shared/layouts/auth/sign-up";

export default async function register(req : Request) {
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
    }) as NextResponse

    return await prisma.user.create({
        data: {
            name, 
            email, 
            password: encrypt(password),
            role: await countUsers() === 0 ? 'ADMIN' : 'USER', 
            stack: stack as Stack | null | undefined,
            seniority: role as Seniority | null | undefined
        }
    }) as User
} 