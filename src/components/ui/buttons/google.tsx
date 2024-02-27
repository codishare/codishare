'use client'

import { signIn } from "next-auth/react"

export default function Google() {
    return <button 
        onClick={() => signIn('google')}
        className="py-2 px-4 flex justify-center items-center gap-2 border focus:ring-gray-500 focus:ring-offset-gray-200 transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
    >
        <img className="w-4 h-4" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />

        Google
    </button>
}