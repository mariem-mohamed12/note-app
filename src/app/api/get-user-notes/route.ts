import { getUserToken } from "@/app/helpers/getusertoken";
import { IgetUserNotesRes } from "@/interface/IgetUserNotes";
import { NextResponse } from "next/server";

export async function GET() {
    const token = await getUserToken()
    const response = await fetch(
        `${process.env.API_URL}/notes`,
        {
            headers: {
                token: `3b8ny__${token}`,
                "content-type": "application/json",
            },
        }
    );
    const data: IgetUserNotesRes = await response.json();
    return NextResponse.json(data)
}
