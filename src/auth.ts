import NextAuth, { type NextAuthConfig } from 'next-auth';  
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'

const authConfig = {
    pages: {
        signIn: '/auth/signin'
    },
    providers: [
        Github({
            clientId: "f96b1116506ff30962eb",
            clientSecret: "63d0d3ffdc5a5f8e4f5b08092af68d37ad527441"
        }),
        Credentials({
            name: 'credentials', 
            credentials: {
                username: {
                    label: "User Name",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials, req) => {
                return null
            }
        })
    ],
} satisfies NextAuthConfig; 

export const { 
    handlers: { GET, POST },
    auth, 
    signIn, 
    signOut 
} = NextAuth(authConfig)