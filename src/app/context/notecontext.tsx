"use client";
import { IgetUserNotesRes } from "@/interface/IgetUserNotes";
import React, { createContext, useEffect, useState } from "react";

type NoteContentType = {
  notes: IgetUserNotesRes | null;
  loading: boolean;
  getNotes: () => Promise<void>;
};

export const NotesContext = createContext<NoteContentType>({
  notes: null,
  loading:false,
  getNotes:async () => {},
});
export default function NotesContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [notes, setNotes] = useState<IgetUserNotesRes | null>(null);
  const [loading, setLoading] = useState(true);

  async function getNotes() {
    setLoading(true);
    const response = await fetch("/api/get-user-notes");
    const data = await response.json();
    setNotes(data);
    setLoading(false);
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, loading, getNotes }}>
      {children}
    </NotesContext.Provider>
  );
}
