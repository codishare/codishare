'use server'

import { signIn } from "@/auth"

export async function authorize(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', Object.fromEntries(formData))
    } catch (error) {
        const e: Error = (error as Error)

        if(e.stack?.includes('CredentialsSignin')) return 'CredentialsSignin'

        throw e
    }
}