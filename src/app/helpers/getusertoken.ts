import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"


export async function getUserToken() {

    const cokkieName = process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'
    const x = (await cookies()).get(cokkieName)?.value
    const token = await decode({ token: x, secret: process.env.NEXTAUTH_SECRET! })
    return token?.token
}