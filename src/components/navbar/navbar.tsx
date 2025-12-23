"use client";
import { Pencil } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function Navbar() {
  const { status } = useSession();
  const pathname = usePathname();

  const isAuthPage = pathname === "/" || pathname === "/signup";

  if (status === "loading") return null;

  return (
    <header
      className={`w-full ${
        isAuthPage
          ? "absolute top-0 left-0 z-10 bg-transparent"
          : "bg-white border-b"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/note">
          <h2
            className={`flex items-center gap-2 font-bold text-lg sm:text-xl md:text-2xl ${
              isAuthPage ? "text-white" : "text-slate-800"
            }`}
          >
            <Pencil
              className={`w-5 h-5 md:w-6 md:h-6 ${
                isAuthPage ? "text-blue-400" : "text-blue-600"
              }`}
            />
            Notes App
          </h2>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {status === "unauthenticated" && (
            <>
              <Link href="/">
                <Button
                  variant={isAuthPage ? "ghost" : "outline"}
                  className={`text-sm sm:text-base  cursor-pointer ${
                    isAuthPage
                      ? "text-white hover:bg-white/10"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup">
               <Button
                  variant={isAuthPage ? "ghost" : "outline"}
                  className={`text-sm sm:text-base  cursor-pointer ${
                    isAuthPage
                      ? "text-white hover:bg-white/10"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Register
                </Button>
              </Link>
            </>
          )}

          {status === "authenticated" && (
            <>
              <Link href="/allnotes">
                <Button
                  variant="outline"
                  className="border-blue-600  cursor-pointer text-blue-600 hover:bg-blue-50 hover:text-blue-500 text-sm sm:text-base"
                >
                  All Notes
                </Button>
              </Link>

              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white text-sm"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
