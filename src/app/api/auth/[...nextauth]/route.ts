import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthFormProps } from '@/types/auth/_types';
import { createUser } from '@/lib/actions';

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET as string,

    session: {
        strategy: 'jwt'
    },
    
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            authorize: async (credentials, req) => {
                const {
                    email,
                    password, 
                    confirm_password,
                    extend
                } = credentials as AuthFormProps;

                await createUser();

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