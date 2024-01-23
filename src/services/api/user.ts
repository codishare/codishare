import prisma from "@/lib/prisma";

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