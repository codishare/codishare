'use server'

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/constants/auth"

export async function authorize(extend: boolean = false, form: FormData) {
    try {
        await signIn('credentials', {
            extend,
            ...Object.fromEntries(form),
            redirect: false, 
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })

        return true
    } catch (error) {
        const e: Error = (error as Error)

        if(e.message.includes('CredentialsSignin')) return 'CredentialsSignin'

        return 'AuthError'
    }
}