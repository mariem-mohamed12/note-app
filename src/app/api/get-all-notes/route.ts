import { IGetAllNotesRes } from "@/interface/IGetAllNotes";
import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch(`${process.env.API_URL}/notes/allNotes`);
    const data: IGetAllNotesRes = await response.json();
    return NextResponse.json(data)
}
