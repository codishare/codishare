import NextAuth, { type NextAuthConfig } from 'next-auth';  
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { login } from './actions/auth';

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
            credentials: {},
            authorize: async (credentials, req) => {
                const { email, password } = credentials as {
                    email: string, 
                    password: string
                }

                if(!email || !password) return Promise.reject('ArgumentsMustBeFilledOut')

                const attempt = await login({
                    email, 
                    password
                })

                if(!attempt) return Promise.reject('InvalidCredentials')

                if(typeof attempt === 'string') return Promise.reject(attempt)

                return attempt as any
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 2, // @ 2 Days
        generateSessionToken: () => {
            return Math.random().toString(36).slice(-8)
        }
    },
    callbacks: {
        authorized({
            auth,
            request: { nextUrl }
        }) {
            const isAuthorized = !!auth?.user

            console.log(isAuthorized)
            
            if(!isAuthorized && !nextUrl.pathname.includes('/auth')) return Response.redirect('/auth/signin')

            if(isAuthorized && nextUrl.pathname.includes('/auth')) return Response.redirect('/')

            return true
        }
    }
} satisfies NextAuthConfig; 

export const { 
    handlers: { GET, POST },
    auth, 
    signIn, 
    signOut 
} = NextAuth(authConfig)