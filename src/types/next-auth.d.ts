import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        token:string
    }
    interface User {
        token: string
    }
}
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    interface JWT {
        token:string
    }
}