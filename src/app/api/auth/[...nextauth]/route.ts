import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,

    session: {
        strategy: 'jwt'
    },
    
    providers: [
        CredentialsProvider({
            type: "credentials",
            
            credentials: {}, 

            authorize: async () => {
                return null
            }
        }),

        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],

    pages: {
        signIn: '/auth/signin'
    }
};

export const handler = NextAuth(authOptions);

export {
    handler as GET, 
    handler as POST
};