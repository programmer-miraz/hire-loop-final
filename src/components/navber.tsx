"use client";
import logo from "../../public/images/logo.png"
import { useState } from "react";
import Link from "next/link";
import { Infinity as InfinityIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

// Every link shown inside the navbar (desktop + mobile)

// Small helper so we don't repeat the same classNames on every link
function linkClass(extra = "") {
  return `text-sm text-neutral-300 hover:text-white transition-colors ${extra}`;
}

export default function Navber() {
  // true = mobile menu is open, false = closed
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const userSession = session?.user;
  const links = [
    { label: "Browse Jobs", href: "/browse-jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
    { label: "Deshboard", href: `/deshboard/${userSession?.role || "seeker"}` },
  ];


  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/Login");
        },
      },
    });


  }

  return (
    <header className="w-full  px-4 pt-3">
      <nav className="mx-auto flex h-15 max-w-7xl items-center rounded-3xl bg-[#222222]/90 px-6 backdrop-blur-md">
        {/* Logo */}
        <Link href="/" className="flex items-center text-xl font-extrabold tracking-tight">
          <Image
            src={logo}
            alt="HireLoop Logo"
            width={110}
            height={30}
          />
        </Link>

        {/* ----- Desktop menu (hidden on small screens) ----- */}
        {userSession ?
          (<div className="ml-auto hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass()}>
                {link.label}
              </Link>
            ))}
            <h1 className="text-yellow-500">
              {userSession?.name}
            </h1>
            <Button className="text-red-500 cursor-pointer" onClick={handleSignout}> Sign out</Button>
          </div>) :
          (<div className="ml-auto hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass()}>
                {link.label}
              </Link>
            ))}
            {/* Divider between links and auth buttons */}
            <div className="h-5 w-px bg-white/20" />
            <Link href="/Login" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
              Sign In
            </Link>
            <Link
              href="/get-started"
              className="flex h-9 items-center rounded-full bg-violet-600 px-5 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
            >
              Get Started
            </Link>
          </div>)}

        {/* ----- Mobile hamburger button (hidden on md screens and up) ----- */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto flex size-9 items-center justify-center rounded-full text-white hover:bg-white/10 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* ----- Mobile dropdown menu ----- */}
      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl bg-[#131010]/95 p-3 backdrop-blur-md md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={linkClass(
                "block rounded-lg px-3 py-2.5 hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="my-2 h-px bg-white/10" />

          {userSession ? (
            <>
              <p className="px-3 py-2 text-sm font-medium text-white">
                {userSession?.name}
              </p>

              <button
                onClick={handleSignout}
                className="mt-2 w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-400 hover:bg-white/10"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/Login"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-violet-400 hover:bg-white/10 hover:text-violet-300"
              >
                Sign In
              </Link>

              <Link
                href="/get-started"
                onClick={() => setOpen(false)}
                className="mt-2 flex h-10 items-center justify-center rounded-full bg-violet-600 text-sm font-medium text-white hover:bg-violet-500"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}

    </header>
  );
}
