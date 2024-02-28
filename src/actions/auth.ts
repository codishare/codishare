'use server'

import { signIn } from "@/auth"
import { findByEmail, register } from "./account"
import { compareEncryption } from "@/lib/encryption"
import { User } from "@/types/auth/_types"

export async function login({
    email,
    password
}: {
    email: string,
    password: string
}) : Promise<User | string> {
    const user = await findByEmail(email)

    if(!user) return 'InvalidCredentials'

    if(!compareEncryption(password, user.password)) return 'InvalidCredentials'

    return user;
}

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
        if(e.stack?.includes('InvalidCredentials')) return 'InvalidCredentials'
        if(e.stack?.includes('PasswordMismatch')) return 'PasswordMismatch'
        if(e.stack?.includes('ArgumentsMustBeFilledOut')) return 'ArgumentsMustBeFilledOut'
        if(e.stack?.includes('AccountCreated')) return 'AccountCreated'
        if(e.stack?.includes('EmailAlreadyExists')) return 'EmailAlreadyExists'
        if(e.stack?.includes('AccountCreationFailed')) return 'AccountCreationFailed'

        return 'UnknownError'
    }
}