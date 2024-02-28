"use server"

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { encrypt } from '@/lib/encryption';

export async function findByEmail(email: string) {
    return await prisma.user.findFirst({
        where: {
            email
        }
    })
}

export async function create({
    email,
    password
}: {
    email: string,
    password: string
}) {
    try {
        return await prisma.user.create({
            data: {
                name: email.split('@')[0],
                alias: email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ''),
                email,
                password: encrypt(password)
            }
        })
    } catch (error) {
        return 'AccountCreationFailed'
    }
}

export async function register(formData: FormData) {
    const credentials = z
        .object({
            email: z.string().email(),
            password: z.string().min(8),
            confirm_password: z.string().min(8)
        })
        .safeParse(Object.fromEntries(formData))

    if(credentials.success) {
        const {
            email,
            password,
            confirm_password
        } = credentials.data

        if(password !== confirm_password) return 'PasswordMismatch'

        const user = await findByEmail(email)

        if(user) return 'EmailAlreadyExists'

        await create({
            email,
            password
        })

        return 'AccountCreated'
    }

    return 'ArgumentsMustBeFilledOut'
}