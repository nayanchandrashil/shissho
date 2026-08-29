// src/components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpenText } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({ username, email, password });
      router.refresh();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#FAF7EF]">
      {/* Left: brand panel, matches homepage hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#16152E] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 35px, #E3A43D 36px)",
          }}
        />
        <div className="absolute -top-[15%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#2F8F7E]/20 blur-[130px]" />
        <div className="relative z-10 max-w-sm px-10 text-left">
          <a href="/" className="flex items-center gap-2.5 mb-10">
            <div className="bg-[#E3A43D] p-1.5 rounded-lg">
              <BookOpenText className="h-6 w-6 text-[#16152E]" />
            </div>
            <span className="font-serif font-bold text-2xl text-white tracking-tight">Sissho</span>
          </a>
          <h2 className="font-serif text-3xl font-bold text-white leading-tight mb-4">
            Start a course. Actually finish it.
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Ordered lessons, tracked progress, and instant quiz results from day one.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-2.5">
            <div className="bg-[#E3A43D] p-1.5 rounded-lg">
              <BookOpenText className="h-5 w-5 text-[#16152E]" />
            </div>
            <span className="font-serif font-bold text-xl text-[#16152E] tracking-tight">Sissho</span>
          </div>

          <h1 className="font-serif text-2xl font-bold text-[#16152E] mb-1.5">Create an account</h1>
          <p className="text-sm text-[#55526C] mb-8">Enter your details below to create your account.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">{error}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#16152E] font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11 bg-white border-black/10 focus-visible:ring-[#E3A43D] focus-visible:border-[#E3A43D]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#16152E] font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-white border-black/10 focus-visible:ring-[#E3A43D] focus-visible:border-[#E3A43D]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#16152E] font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-11 bg-white border-black/10 focus-visible:ring-[#E3A43D] focus-visible:border-[#E3A43D]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#E3A43D] hover:bg-[#cf9333] text-[#16152E] font-semibold"
            >
              {loading ? "Creating account..." : "Sign up"}
            </Button>

            <p className="text-sm text-[#55526C] text-center pt-1">
              Already have an account?{" "}
              <a href="/login" className="text-[#2F8F7E] font-medium underline underline-offset-4 hover:text-[#256f64]">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
