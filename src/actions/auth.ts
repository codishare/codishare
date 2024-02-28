'use server'

import { signIn } from "@/auth"
import { register } from "./account"

export async function authorize(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        const {
            registering
        } = Object.fromEntries(formData)

        if(registering == 'true') return await register(formData)

        await signIn('credentials', Object.fromEntries(formData))
    } catch (error) {
        const e: Error = (error as Error)

        if(e.stack?.includes('CredentialsSignin')) return 'CredentialsSignin'
        if(e.stack?.includes('PasswordMismatch')) return 'PasswordMismatch'

        throw e
    }
}