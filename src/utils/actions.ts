'use server'
import { signIn} from "@/auth";

export async function authenticate(email: string, password: string) {
    try {
        const r = await signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: "/",
            redirect: false,
        })
        return r
    } catch (error) {
    }
}