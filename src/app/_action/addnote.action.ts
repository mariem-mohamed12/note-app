"use server"

import { IgetUserNotesRes } from "@/interface/IgetUserNotes";
import { getUserToken } from "../helpers/getusertoken";
import { INoteValues } from "@/interface/IAddNote";


export default async function AddNoteAction(values:INoteValues){
    const token = await getUserToken()
     const response = await fetch(
          `${process.env.API_URL}/notes`,
          {
            method: "POST",
            headers: {
                token:`3b8ny__${token}`,
              "content-type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data : IgetUserNotesRes = await response.json();
        return data
}