import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({

    baseURL: process.env.BETTER_AUTH_URL,

    plugins: [inferAdditionalFields<typeof auth>()],
})

// one single client with plugins — the shared hooks live on it
export const { signIn, signUp,signOut, useSession } = authClient
