import { IFailResLogin, ISucsessResLogin } from "@/interface/ILogin"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authoptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API_URL}/users/signIn`, {
                    method: "POST",
                    headers: { 'content-type': "application/json" },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })
                const payload: ISucsessResLogin | IFailResLogin = await response.json()
                if ('token' in payload) {
                    return {
                        id: payload.token,
                        token: payload.token
                    }
                }
                else {
                    throw new Error(payload.msg)
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.token = user.token
            }
            return token
        },
        session: async ({ session, token }) => {
            session.token = token.token
            return session
        }
    },
    pages: {
        signIn: "/",
        error: "/"
    },
    secret: process.env.NEXTAUTH_SECRET
}