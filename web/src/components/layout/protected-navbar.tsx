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
    <header className="px-6 h-[72px] flex items-center justify-between border-b border-black/5 bg-[#FAF7EF]/80 backdrop-blur-md sticky top-0 z-50 transition-all">
      <Link className="flex items-center gap-2.5 group cursor-pointer" href="/">
        <div className="bg-[#E3A43D] p-1.5 rounded-xl text-[#16152E] shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
          <BookOpenText className="h-6 w-6" />
        </div>
        <span className="font-serif font-extrabold text-2xl text-[#16152E] tracking-tight">Sissho</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/5 text-[#16152E]">
          <UserCircle className="h-5 w-5 text-[#55526C]" />
          <span className="text-sm font-medium">My Account</span>
        </div>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="cursor-pointer flex items-center gap-2 rounded-full text-[#55526C] hover:text-red-600 hover:bg-red-50 transition-colors px-4"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Logout</span>
        </Button>
      </div>
    </header>
  );
}
