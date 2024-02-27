import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
    providers: [], 
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error'
    },
    callbacks: {
        async signIn() {
            return true;
        },

        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const onAuthModule = nextUrl.pathname.includes('/auth');

            if(!onAuthModule) {
                if(!isLoggedIn) return Response.redirect(new URL('/auth/signin', nextUrl));
            }

            return true;
        },
    },

    session: {
        strategy: 'jwt'
    }
} satisfies NextAuthConfig;