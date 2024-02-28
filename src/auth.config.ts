import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/auth/signin'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 2, // @ 2 Days
        generateSessionToken: () => {
            return Math.random().toString(36).slice(-8)
        }
    },
    providers: []
} satisfies NextAuthConfig;