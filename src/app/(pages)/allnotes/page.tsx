"use client";

import Loading from "@/app/loading";
import { IGetAllNotesRes } from "@/interface/IGetAllNotes";
import { useEffect, useState } from "react";

export default function AllNotes() {
  const [notes, setNotes] = useState<IGetAllNotesRes["notes"]>([]);
  const [loading, setLoading] = useState(true);

  async function getAllNotes() {
    setLoading(true);
    const response = await fetch("/api/get-all-notes");
    const data: IGetAllNotesRes = await response.json();

    const sortedNotes = data.notes
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    setNotes(sortedNotes);
    setLoading(false);
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 my-10">
      <h2 className="text-xl md:text-2xl font-semibold text-blue-500 mb-6">
        All User Notes
      </h2>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {notes.map((note) => (
          <div key={note._id} className="p-4 bg-[#F9FAFB] rounded-lg shadow-sm">
            <h3 className="font-semibold text-slate-800 line-clamp-1">
              note title: {note.title}
            </h3>

            <p className="text-sm text-slate-600 mt-2 line-clamp-3 sm:line-clamp-2">
              note content: {note.content}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
