const JWT_SECRET: string | undefined = process.env.JWT_SECRET!

export function getJwtSecretKey(): string {
    if (!JWT_SECRET || JWT_SECRET.length === 0) {
        throw new Error('The environment variable JWT_SECRET is not set.')
    }

    return JWT_SECRET
}