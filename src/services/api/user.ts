import prisma from "@/lib/prisma";
import { compareEncryption } from "@/lib/encryption"; 

export async function isEmailInUse(email: string) {
    return !! await prisma.user.findFirst({
        where: {
            email
        }
    }) 
}

export async function countUsers() {
    return await prisma.user.count();
}

export async function validateCredentials(email: string, password: string) {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if(!user) return false;

    const isValidPassword = compareEncryption(password, user.password); 

    if(!isValidPassword) return false;

    return user;
}

export async function getUserById(id: number) {
    return await prisma.user.findFirst({
        where: {
            id
        }, 
        select: {
            id: true,
            name: true,
            alias: true,
            stack: true,
            seniority: true
        }
    })
}