"use client";

import deleteNoteAction from "@/app/_action/deletenote.action";
import updateNoteAction from "@/app/_action/updatenote.action";
import { NotesContext } from "@/app/context/notecontext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Pencil, Trash } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(6, "Content must be at least 6 characters"),
});

export default function UpdateAndDeleteButtons({
  noteId,
  noteTitle,
  noteContent,
}: {
  noteId: string;
  noteTitle: string;
  noteContent: string;
}) {
  const { getNotes } = useContext(NotesContext);

  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: noteTitle,
      content: noteContent,
    },
  });

  useEffect(() => {
    form.reset({
      title: noteTitle,
      content: noteContent,
    });
  }, [noteTitle, noteContent, form]);

  async function updateNote(values: { title: string; content: string }) {
    setIsUpdating(true);

    const res = await updateNoteAction(noteId, values);

    if (res.msg === "done") {
      toast.success("Note updated successfully");
      setOpen(false);
      await getNotes();
    } else {
      toast.error("Failed to update note");
    }

    setIsUpdating(false);
  }

  async function deleteNote() {
    setIsDeleting(true);

    const res = await deleteNoteAction(noteId);

    if (res.msg === "done") {
      toast.success("Note deleted successfully");
      await getNotes();
    } else {
      toast.error("Failed to delete note");
    }

    setIsDeleting(false);
  }

  return (
    <>
     
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="w-[90%] mb-3 cursor-pointer mx-auto bg-yellow-500 hover:bg-yellow-400 flex gap-1"
          >
            <Pencil />
            Update
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Note</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updateNote)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Note title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Note content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-[#0D5DF8] hover:bg-[#0b4fd6]"
                >
                  {isUpdating ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

     
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            className="w-[90%] mx-auto cursor-pointer bg-red-500 hover:bg-red-400 flex gap-1"
          >
            <Trash />
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              note.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={deleteNote}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-400"
            >
              {isDeleting ? (
                <Loader className="animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}