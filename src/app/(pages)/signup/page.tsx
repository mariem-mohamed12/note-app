"use client";
import RegisterAcion from "@/app/_action/register.action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const registerShcema = z.object({
  name: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .nonempty("input is required"),
  email: z
    .string()
    .email("please enter invalid email")
    .nonempty("input is requird"),
  password: z
    .string()
    .regex(/^\w{6,}$/, {
      message: "Password Must be at least 6 characters",
    })
    .nonempty("input is requird"),
  age: z
    .string()
    .nonempty("age is requied")
    .refine((value) => Number(value) >= 18, {
      message: "you must be at least 18 years old",
    }),
  phone: z.string().regex(/^01[0125][0-9]{8}$/),
});

export default function Signup() {
  type register = z.infer<typeof registerShcema>;
  const form = useForm<register>({
    resolver: zodResolver(registerShcema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<null | string>(null);
  const router = useRouter();

  async function onSubmit(values: register) {
    setIsError(null)
    setIsLoading(true);
   const data = await RegisterAcion(values)
    if (data.msg === "done") {
      setIsLoading(false);
      toast.success("account created successfully");
      router.push("/");
    } else {
      setIsLoading(false);
      setIsError(data.msg);
    }
  }

  return (
    <section className="bg-linear-[25deg,#060B1F,#0C152A,#141F33] h-screen flex justify-center items-center flex-col">
      <h3 className="text-white sm:text-[16px] md:text-[21px] font-semibold mb-2">
        Join Us
      </h3>
      <p className="text-gray-400 mb-5"> create your account to get start </p>
      <Card className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto bg-[#141F33] p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      className="bg-[#223048] border-none text-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      className="bg-[#223048] border-none text-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="bg-[#223048] border-none text-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Age"
                      className="bg-[#223048] border-none text-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      className="bg-[#223048] border-none text-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading}
              type="submit"
              className="w-full bg-[#00A1E7] hover:bg-[#008fcc] cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader className="animate-spin" /> : null}
              Create Account
            </Button>
            <p className=" text-red-500 text-center "> {isError} </p>
            <p className="text-gray-400 text-center">
              already have an account?
              <Link href={"/"} className="text-[#00a1e7] hover:underline">
                login
              </Link>
            </p>
          </form>
        </Form>
      </Card>
    </section>
  );
}
