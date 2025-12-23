"use client"
import { NotesContext } from "@/app/context/notecontext";
import { StickyNote } from "lucide-react";
import { useContext } from "react";
import UpdateAndDeleteButtons from "../updatedeltebuttons/updateanddeltebuttons";

export default function MyNotes() {

  const { notes } = useContext(NotesContext)

  const latestNotes = (notes?.notes ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <div className="container mx-auto px-4 my-2">
      <h2 className="text-xl md:text-2xl font-semibold text-blue-500 mb-6">
        My Notes
      </h2>
      {latestNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <StickyNote className="w-10 h-10 text-gray-400 mb-1" />
          <h3 className="text-lg font-semibold text-gray-800">No notes yet</h3>
          <p className="text-sm text-gray-500 mt-1">
            Create a note to keep your thoughts organized.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {latestNotes.map((note) => (
            <div
              className="p-4 bg-[#F9FAFB] rounded-lg shadow-sm flex flex-col"
              key={note._id}
            >
              <h3 className="font-semibold text-slate-800 line-clamp-1">
                note title: {note.title}
              </h3>

              <p className="text-sm text-slate-600 mt-2 line-clamp-3 sm:line-clamp-2">
                note content: {note.content}
              </p>

              <div className="my-2">
                <UpdateAndDeleteButtons noteId={note._id} noteTitle={note.title} noteContent={note.content}/>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
