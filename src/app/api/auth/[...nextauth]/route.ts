import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

export const options: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,

    session: {
        strategy: 'jwt'
    },
    
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
};

export const handler = NextAuth(options);

export {
    handler as GET, 
    handler as POST
};