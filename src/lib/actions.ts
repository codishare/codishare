'use server'

import { signIn } from "next-auth/react"

export async function authorize(extend: boolean = false, form: FormData) {
    try {
        await signIn('credentials', {
            extend,
            ...Object.fromEntries(form)
        })
    } catch (error) {
        const e = error as Error

        if(e.message.includes('CredentialsSignin')) {
            return 'CredentialsSignin'
        }

        throw e
    }
}

export async function createUser() {
    console.log("awdawd")
}