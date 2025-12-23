
"use server"

import { INoteValues } from "@/interface/IAddNote";
import { getUserToken } from "../helpers/getusertoken";

export default async function updateNoteAction(noteId: string  , values:INoteValues) {
    const token = await getUserToken()
    const response = await fetch(
        `${process.env.API_URL}/notes/${noteId}`,
        {
            method: "PUT",
            headers: {
                token:`3b8ny__${token}`,
                "content-type": "application/json",
            },
            body:JSON.stringify(values)
        }
    );
    const data = await response.json();
    return data
}