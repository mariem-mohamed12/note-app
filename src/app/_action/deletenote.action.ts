
"use server"

import { getUserToken } from "../helpers/getusertoken";

export default async function deleteNoteAction(noteId: string) {
    const token = await getUserToken()
    const response = await fetch(
        `${process.env.API_URL}/notes/${noteId}`,
        {
            method: "DELETE",
            headers: {
                token:`3b8ny__${token}`,
                "content-type": "application/json",
            },
        }
    );
    const data = await response.json();
    return data
}