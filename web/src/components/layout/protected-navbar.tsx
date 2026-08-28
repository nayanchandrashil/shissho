"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpenText, LogOut, UserCircle } from "lucide-react";

export function ProtectedNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/");
  };

  return (
    <header className="px-6 h-[72px] flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all">
      <Link className="flex items-center gap-2.5 group cursor-pointer" href="/">
        <div className="bg-gradient-to-tr from-indigo-600 to-cyan-500 p-1.5 rounded-xl text-white shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
          <BookOpenText className="h-6 w-6" />
        </div>
        <span className="font-extrabold text-2xl text-slate-900 tracking-tight">Sissho</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
          <UserCircle className="h-5 w-5 text-slate-500" />
          <span className="text-sm font-medium">My Account</span>
        </div>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="cursor-pointer flex items-center gap-2 rounded-full text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors px-4"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Logout</span>
        </Button>
      </div>
    </header>
  );
}
