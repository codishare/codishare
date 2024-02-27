import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import GitHub from "next-auth/providers/github"
 
export const { 
    handlers: { GET, POST },
    auth, 
    signIn, 
    signOut 
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                return null
            }
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
    ],
});