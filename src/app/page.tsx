"use client";
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
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerShcema = z.object({
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
});

export default function Home() {
  const {status}=useSession()
    const router = useRouter();

  useEffect( ()=>{
    if(status === 'authenticated'){
      router.replace('/note')
    }
  } ,[status,router])
  type register = z.infer<typeof registerShcema>;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();


  const form = useForm<register>({
    resolver: zodResolver(registerShcema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: register) {
    setIsLoading(true);
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/note",
      redirect: true,
    });
    setIsLoading(false);
  }

  return (
    <section className="bg-linear-[25deg,#060B1F,#0C152A,#141F33] h-screen flex justify-center items-center flex-col">
      <h3 className="text-white sm:text-[16px] md:text-[21px] font-semibold mb-2">
        Welcome Back
      </h3>
      <p className="text-gray-400 mb-5"> Login to Your account </p>
      <Card className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto bg-[#141F33] p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#00A1E7] hover:bg-[#008fcc] cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader className="animate-spin" /> : null}
              Submit
            </Button>
            {searchParams.get("error") && (
              <p className="text-red-500 text-center text-sm">
                {searchParams.get("error")}
              </p>
            )}
            <p className="text-gray-400 text-center">
              Don`t have an account?
              <Link href={"/signup"} className="text-[#00a1e7] hover:underline">
                Register
              </Link>
            </p>
          </form>
        </Form>
      </Card>
    </section>
  );
}