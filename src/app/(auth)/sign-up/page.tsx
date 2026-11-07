"use client"
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function Sign_up_page() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData.entries())
        console.log(userData);

        const { data, error } = await authClient.signUp.email({
            name: userData.name as string,
            email: userData.email as string,
            password: userData.password as string,
            callbackURL: "/"

        })
        if (data) {
            console.log(data);
            router.push("/")
        }

        if (error) {
            console.log(error);
        }
    }
           const handleGoogleLogin = async () => {
                const { data, error } = await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/"
        
        
                });
        
                if (data) {
                    toast.success("Login successful!")
                }
        
        
        
                if (error) {
                    toast.error(error.message || "Failed login!");
                }
        
            }
        
            const handleGithub = async () => {
                const { data, error } = await authClient.signIn.social({
                    provider: "github"
                })
                if (data) {
                    toast.success("Login successful!")
                }
        
                if (error) {
                    toast.error(error.message || "Failed login!");
                }
        
            }


    
    return (
        <div className="flex justify-center px-4 py-14">
            {/* The card that holds the whole form (design only, no logic yet) */}
            <div className="relative w-full max-w-sm">
                {/* Blue glow shadow behind the card */}
                <div className="absolute -inset-4 rounded-3xl bg-blue-600/15 blur-2xl" />
                <Card className="relative z-10 rounded-2xl border-white/10 bg-[#131313] text-white ring-0">
                    <form onSubmit={handleSignup}>
                        <CardContent className="flex flex-col gap-5">
                            {/* Logo + heading at the top of the card */}
                            <div className="flex flex-col items-center gap-2 text-center">
                                <Image src="/images/logo.png" alt="HireLoop" width={110} height={30} />
                                <h1 className="text-2xl font-bold text-white">Create your account</h1>
                                <p className="text-sm text-neutral-500">
                                    Join HireLoop and find your dream job faster.
                                </p>
                            </div>

                            {/* --- Form fields (design only for now) --- */}
                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="name" className="text-neutral-400">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Your full name"
                                        className="h-11 border-white/10 bg-white/5 text-white placeholder:text-neutral-500"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="email" className="text-neutral-400">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="h-11 border-white/10 bg-white/5 text-white placeholder:text-neutral-500"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <Label htmlFor="password" className="text-neutral-400">
                                        Password
                                    </Label>

                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="••••••••"
                                            className="h-11 border-white/10 bg-white/5 pr-11 text-white placeholder:text-neutral-500"
                                        />

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-1 cursor-pointer top-1.5  size-9  text-neutral-400 hover:bg-white/5 hover:text-white"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Main purple button */}
                            <Button type="submit" className="h-11 w-full cursor-pointer rounded-full bg-violet-600 text-white hover:bg-violet-500">
                                Sign-up
                            </Button>

                            {/* OR divider line */}
                            <div className="flex items-center gap-3 text-xs text-neutral-500">
                                <div className="h-px flex-1 bg-white/10" />
                                OR
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            {/* Connect with Google button (design only) */}
                            <Button onClick={handleGoogleLogin} type="button" className="h-11 w-full rounded-full cursor-pointer border-white/10 bg-white/5 text-white hover:bg-white/10">
                                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84Z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
                                </svg>
                                Connect with Google
                            </Button>
                            {/* Continue with GitHub (design only) */}
                            <Button onClick={handleGithub} type="button" className="h-11 w-full rounded-full cursor-pointer border-white/10 bg-white/5 text-white hover:bg-white/10">
                                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                                </svg>
                                Continue with GitHub
                            </Button>


                            {/* Link to the login page */}
                            <p className="text-center text-sm text-neutral-500">
                                Already have an account?{" "}
                                <Link href="/Login" className="text-violet-400 hover:text-violet-300">
                                    Sign In
                                </Link>
                            </p>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </div>
    );
}
