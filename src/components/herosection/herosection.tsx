"use client";
import AddNoteAction from "@/app/_action/addnote.action";
import { NotesContext } from "@/app/context/notecontext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(6, "Content must be at least 6 characters"),
});

export default function HeroSection() {
  type NoteForm = z.infer<typeof noteSchema>;

  const form = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const [open, setOpen] = useState<boolean>(false);
  const { getNotes } = useContext(NotesContext);
  const router = useRouter();

  async function onSubmit(values: NoteForm) {
    const data = await AddNoteAction(values);
    if (data.msg === "done") {
      await getNotes();
      router.refresh()
      form.reset();
      setOpen(false);
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center max-w-2xl py-18">
        <h1 className="text-[#101826] text-2xl sm:text-3xl md:text-4xl font-bold">
          Your Thought,
          <span className="text-[#3557FE]">Organized</span>
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-base">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <DialogTrigger asChild>
              <Button className="bg-[#0D60FF] cursor-pointer hover:bg-[#0b4fd6] flex gap-2">
                <Plus size={18} />
                Add Note
              </Button>
            </DialogTrigger>

            <Button variant="outline" className="border cursor-pointer">Learn More</Button>
          </div>

          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
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
                    <Button variant="outline" className="cursor-pointer">
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button
                    type="submit"
                    className="bg-[#0D5DF8] cursor-pointer hover:bg-[#0b4fd6]"
                  >
                    submit
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
