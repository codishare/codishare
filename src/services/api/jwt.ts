import { getJwtSecretKey } from "@/lib/jwt-secret";
import { SignJWT, jwtVerify  } from "jose";

export async function generateAccessToken(userId: Number) {
    return await new SignJWT({
        userId
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(new TextEncoder().encode(getJwtSecretKey()))
}

export async function generateRefreshToken(userId: Number) {
    return await new SignJWT({
        userId
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(getJwtSecretKey()))
}

export function verifyToken(token: string) {
    return jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
}