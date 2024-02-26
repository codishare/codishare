import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

export const options: NextAuthOptions = {
    secret: "mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=",
    
    providers: [
        GithubProvider({
            clientId: "f96b1116506ff30962eb",
            clientSecret: "63d0d3ffdc5a5f8e4f5b08092af68d37ad527441",
        }),
    ],
};

export const handler = NextAuth(options);

export {
    handler as GET, 
    handler as POST
};