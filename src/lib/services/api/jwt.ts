import { getJwtSecretKey } from "@/lib/jwt-secret";
import prisma from "@/lib/prisma";
import { deleteCookie, getCookie } from "cookies-next";
import { SignJWT, decodeJwt, jwtVerify  } from "jose";

export async function generateAccessToken(userId: Number) {
    return await new SignJWT({
        userId
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(new TextEncoder().encode(getJwtSecretKey()))
}

export async function generateRefreshToken(req: Request, userId: Number) {
    const previousRefreshToken = getCookie('refresh-token', { req });

    if(previousRefreshToken) await removeToken([previousRefreshToken]);

    return await new SignJWT({
        userId
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(getJwtSecretKey()))
}

export async function verifyToken(token: string) {
    if (!token) return false;

    const isBlacklisted = await prisma.blacklistedToken.findFirst({
        where: {
            token
        }
    })

    if (isBlacklisted) return false;

    try {
        await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
        
        return true;
    } catch (error) {
        if ((error as Error).name === 'TokenExpiredError') {
            return false;
        }

        return false;
    }
}

export async function decodeToken(token: string) {
    const isValid = await verifyToken(token);

    if(!isValid) return false;

    return decodeJwt(token)
}

export async function removeToken(tokens: String[]) {
    await prisma.blacklistedToken.createMany({
        data: tokens.map(token => ({
            token: token.toString(), 
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5)
        }))
    })

    await prisma.blacklistedToken.deleteMany({
        where: {
            expiresAt: {
                lte: new Date()
            }
        }
    })

    return true; 
}