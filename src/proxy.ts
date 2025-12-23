import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



const mainPages = ['/allNotes']
const authPages = ['/', '/signup']

export default async function proxy(req: NextRequest) {
    const token = await getToken({ req })
    const {pathname} = req.nextUrl
    
    if (mainPages.includes(req.nextUrl.pathname)) {
        if (token) {
            return NextResponse.next()
        }
        else {
            const redirectUrl = new URL('/', process.env.URL)
            return NextResponse.redirect(redirectUrl)
        }

    }
    if (authPages.includes(req.nextUrl.pathname)) {
        if (!token) {
            return NextResponse.next()
        }
        else {
           const redirectUrl= new URL('/', process.env.URL)
            return NextResponse.redirect(redirectUrl)
        }

    }
    return NextResponse.next()
}